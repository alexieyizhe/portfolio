import { FC, ReactNode, useEffect, useState } from 'react';
import { css } from 'goober';

type TTextLoopProps = {
  children: ReactNode[];
  /** ms to dwell on an item, or one delay per item; a negative delay settles there */
  interval?: number | number[];
};

const SLIDE_MS = 220;

/**
 * Built per render rather than at module scope: `extractCss` drains goober's
 * sheet, so a rule registered once at import time is missing from every
 * server render after the first. Class names stay stable across calls. The
 * keyframes these name are declared in globals.css.
 */
const buildStyles = () => ({
  item: css`
    display: inline-block;
  `,
  entering: css`
    animation: slide-in-up ${SLIDE_MS}ms ease-out both;
  `,
  leaving: css`
    animation: slide-out-up ${SLIDE_MS}ms ease-in both;
  `,
});

/**
 * Swaps between children by sliding the current one up and out, then sliding
 * the next one in from below. Only one child is mounted at a time, so the width
 * change between items lands while the text is invisible mid-swap.
 */
const TextLoop: FC<TTextLoopProps> = ({ children, interval = 3000 }) => {
  const [index, setIndex] = useState(0);
  const [isLeaving, setLeaving] = useState(false);
  // the first item is already in place on load; only animate it in after a swap
  const [hasSwapped, setSwapped] = useState(false);
  const styles = buildStyles();
  const count = children.length;
  const delay = Array.isArray(interval)
    ? interval[index % interval.length]
    : interval;
  const isStatic = count <= 1 || delay < 0;

  // dwell on the current item, then start sliding it out
  useEffect(() => {
    if (isStatic || isLeaving) return;

    const id = setTimeout(() => setLeaving(true), delay);
    return () => clearTimeout(id);
  }, [index, isLeaving, delay, isStatic]);

  // once it's gone, swap in the next one
  useEffect(() => {
    if (!isLeaving) return;

    const id = setTimeout(() => {
      setIndex((i) => (i + 1) % count);
      setLeaving(false);
      setSwapped(true);
    }, SLIDE_MS);
    return () => clearTimeout(id);
  }, [isLeaving, count]);

  const animation = isStatic
    ? ''
    : isLeaving
      ? styles.leaving
      : hasSwapped
        ? styles.entering
        : '';

  return (
    <span key={index} className={`${styles.item} ${animation}`}>
      {children[index]}
    </span>
  );
};

export default TextLoop;
