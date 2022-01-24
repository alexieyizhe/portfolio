import { FC, memo } from 'react';

import { Link, Text } from 'components/core';
import { PAST_EXPERIENCE } from 'services/copy';
import { useInitialProps } from 'services/context/initial-props';

const Work: FC = memo(() => {
  const { githubStats } = useInitialProps();
  const latestRepo = githubStats?.reposCommittedTo[0] ?? null;

  return (
    <>
      <Text as="p">
        As a developer, my absolute favourite way to learn is by{' '}
        <Text bold>doing</Text>. I built{' '}
        <Link href="https://github.com/alexieyizhe/intern.plus/" newTab>
          intern+
        </Link>{' '}
        and contribute to other projects
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
        When not in school, I've previously been a part of{' '}
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
        Want to connect with me?{' '}
        <Link href="mailto:hey@alexxie.com">Get in touch</Link>.
      </Text>
    </>
  );
});

export default Work;
