import { FC, memo } from 'react';

import { Link, Text } from 'components/core';
import { PAST_EXPERIENCE } from 'services/copy';
import { useStore } from 'services/store';

const Work: FC = memo(() => {
  const { githubStats } = useStore('githubStats');
  const latestRepo = githubStats?.reposCommittedTo[0] ?? null;

  return (
    <>
      <Text as="p">
        As a developer, my absolute favourite way to learn is by{' '}
        <Text bold>doing</Text>. I built{' '}
        <Link href="https://github.com/alexieyizhe/intern.plus/" newTab>
          intern+
        </Link>{' '}
        and contribute to projects
        {latestRepo ? (
          <>
            {' '}
            like{' '}
            <Link href={latestRepo.url} newTab>
              {latestRepo.name}
            </Link>{' '}
          </>
        ) : (
          ' '
        )}
        to do exactly that.
      </Text>

      <Text as="p">
        Next spring, I'll be working at an ML stealth startup. I've previously
        been a part of{' '}
        {PAST_EXPERIENCE.map(({ label, href, color }, i, arr) => {
          const isLast = i === arr.length - 1;
          return (
            <>
              {isLast ? ' and ' : ' '}
              <Link href={href} newTab bare>
                <Text bold color={color}>
                  {label}
                </Text>
              </Link>
              {isLast ? '.' : ','}
            </>
          );
        })}
      </Text>

      <Text as="p">
        I'm looking for <Text bold>summer 2021 opportunities</Text>! Take a peek
        at my resume below or{' '}
        <Link href="mailto:alex@xie.codes">get in touch</Link>.
      </Text>
    </>
  );
});

export default Work;
