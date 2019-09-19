import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";

import { BaseElementProps } from "~types/BaseElementProps";

import Button from "~components/Button";
import GalleryParticles from "./GalleryParticles";

export interface GalleryProps extends BaseElementProps {
  images: string[];
  particles?: boolean;
  defaultIndex?: number;
  hideButtons?: boolean;
  autoScroll?: number;
}

const BUTTON_OFFSET = 20;

const Container = styled.div<{ hideButtons?: boolean }>`
  position: relative;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  & > .left-button {
    ${({ hideButtons }) => hideButtons && `display: none;`}
    position: absolute;
    left: -${BUTTON_OFFSET}px;
    z-index: 2;
  }

  & > .right-button {
    ${({ hideButtons }) => hideButtons && `display: none;`}
    position: absolute;
    right: -${BUTTON_OFFSET}px;
    z-index: 2;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  border-radius: 50%;
  width: 300px;
  height: 300px;

  overflow: hidden;

  display: grid;
  justify-content: center;
  align-items: center;

  z-index: 1;

  & > * {
    grid-row: 1;
    grid-column: 1;
  }

  &:after {
    box-shadow: inset 0px 0px 5px rgba(0, 0, 0, 0.2);
    content: "";
    display: block;
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;

    border-radius: 50%;
  }
`;

const GalleryImage = styled.img<{ show: boolean }>`
  width: 100%;

  transition: opacity 400ms ease;
  opacity: ${({ show }) => (show ? 1 : 0)};
`;

const Gallery: React.FC<GalleryProps> = ({
  images,
  particles,
  defaultIndex = 0,
  hideButtons,
  autoScroll,
}) => {
  const [curImgIndex, setCurImgIndex] = useState(defaultIndex);

  const goPrevImg = useCallback(
    () => setCurImgIndex(curIndex => Math.max(0, curIndex - 1)),
    [setCurImgIndex]
  );

  const goNextImg = useCallback(
    () => setCurImgIndex(curIndex => Math.min(images.length - 1, curIndex + 1)),
    [images.length]
  );

  useEffect(() => {
    let timer: NodeJS.Timer;

    if (autoScroll) {
      timer = setInterval(
        () => setCurImgIndex(curIndex => (curIndex + 1) % images.length),
        autoScroll
      );
    }

    return () => clearInterval(timer);
  }, [autoScroll, images.length]);

  return (
    <Container hideButtons={hideButtons}>
      {images.length > 1 && (
        <Button
          name="chevron-left"
          className="left-button"
          onClick={goPrevImg}
          disabled={curImgIndex === 0}
        />
      )}

      <ImageContainer>
        {images.map((image, i) => (
          <GalleryImage key={image} src={image} show={i === curImgIndex} />
        ))}
      </ImageContainer>

      {images.length > 1 && (
        <Button
          name="chevron-right"
          className="right-button"
          onClick={goNextImg}
          disabled={curImgIndex === images.length - 1}
        />
      )}

      {particles && <GalleryParticles />}
    </Container>
  );
};

export default Gallery;
