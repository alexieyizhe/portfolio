import { FC } from 'react';

import { useSiteContext } from 'services/site/store';
import { Link, Text } from 'components/core';
import DynamicTime from 'components/DynamicTime';
import DynamicTagline from 'components/DynamicTagline';
import DynamicCurrentStatus from 'components/DynamicCurrentStatus';

const About: FC = () => {
  const { talkingPoint, currentCity } = useSiteContext();

  return (
    <>
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
          for me in <span className="dynamic">{currentCity}</span>
          ; I'm <DynamicCurrentStatus />
        </Text>
      </p>

      <p>
        <Text>
          Wanna chat about <span className="dynamic">{talkingPoint}</span>? Lets
          talk. You can reach me at{' '}
          <Link href="mailto:alex@xie.codes">alex@xie.codes</Link>.
        </Text>
      </p>
    </>
  );
};

export default About;
