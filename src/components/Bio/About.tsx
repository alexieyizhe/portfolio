import { FC } from 'react';

import { useSiteStore } from 'services/store';
import { Link, Text } from 'components/core';
import DynamicTime from 'components/DynamicTime';
import DynamicTagline from 'components/DynamicTagline';
import DynamicCurrentStatus from 'components/DynamicCurrentStatus';

const About: FC = () => {
  const { talkingPoint, currentCity } = useSiteStore(
    'talkingPoint',
    'currentCity'
  );

  return (
    <>
      <div>
        <Text as="p">
          I’m a{' '}
          <span className="dynamic">
            <DynamicTagline />
          </span>{' '}
          that's currently studying computer science at the University of
          Waterloo.
        </Text>
      </div>

      <div>
        <Text as="p">
          It’s currently{' '}
          <span className="dynamic">
            <DynamicTime />
          </span>{' '}
          for me in <span className="dynamic">{currentCity}</span>;{' '}
          <DynamicCurrentStatus />
        </Text>
      </div>

      <div>
        <Text as="p">
          Wanna chat about <span className="dynamic">{talkingPoint}</span>? Lets
          talk. You can reach me at{' '}
          <Link href="mailto:alex@xie.codes">alex@xie.codes</Link>.
        </Text>
      </div>
    </>
  );
};

export default About;
