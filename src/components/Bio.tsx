import { FC } from 'react';
import { styled } from 'goober';

import { useSiteContext } from 'services/site/context';
import { Link, Text } from 'components/core';
import DynamicTime from 'components/DynamicTime';
import DynamicTagline from 'components/DynamicTagline';
import DynamicCurrentStatus from 'components/DynamicCurrentStatus';

const Container = styled('div')`
  margin-top: 1.6em;

  & .dynamic {
    font-weight: 500;
  }
`;

const Bio: FC = () => {
  const { talkingPoint } = useSiteContext();

  return (
    <Container>
      <p>
        <Text>
          I’m a{' '}
          <span className="dynamic">
            <DynamicTagline />
          </span>{' '}
          that's currently studying computer science at the University of
          Waterloo.
        </Text>
      </p>

      <p>
        <Text>
          It’s currently{' '}
          <span className="dynamic">
            <DynamicTime />
          </span>{' '}
          for me; I'm <DynamicCurrentStatus />
        </Text>
      </p>

      <p>
        <Text>
          Wanna chat about <span className="dynamic">{talkingPoint}</span>? Lets
          talk. You can reach me at{' '}
          <Link href="mailto:hi@alexxie.com">hi@alexxie.com</Link>.
        </Text>
      </p>
    </Container>
  );
};

export default Bio;
