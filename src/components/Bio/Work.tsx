import { FC, memo } from 'react';

import { Link, Text } from 'components/core';
import { PAST_EXPERIENCE } from 'services/copy';
import { useSiteStore } from 'services/store';

const Work: FC = memo(() => {
  const { githubStats } = useSiteStore('githubStats');
  const latestRepo = githubStats?.reposCommittedTo[0] ?? null;
  return (
    <>
      <Text as="p">
        My absolute favourite way to learn is by doing. I'm the creator of{' '}
        <Link href="https://github.com/alexieyizhe/intern.plus/" newTab>
          intern+
        </Link>{' '}
        and I contribute to projects
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
        to grow as a developer.
      </Text>

      <Text as="p">
        Next spring, I'll be working at a stealth startup that empowers
        companies to build applications around their ML models. In the past,
        I've been a part of{' '}
        {PAST_EXPERIENCE.map((experience, i, arr) => {
          const isLast = i === arr.length - 1;
          return (
            <>
              {isLast ? ' and ' : ' '}
              <Link href={experience.href} newTab>
                {experience.label}
              </Link>
              {isLast ? '.' : ','}
            </>
          );
        })}
      </Text>

      <Text as="p">
        I'm looking for <Text bold>summer and winter 2021 opportunities</Text>!
        Take a peek at my resume below or{' '}
        <Link href="mailto:alex@xie.codes">get in touch</Link>.
      </Text>
    </>
  );
});

export default Work;
