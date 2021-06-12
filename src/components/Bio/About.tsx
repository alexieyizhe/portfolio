import { Link, Text } from 'components/core';
import DynamicTime from 'components/DynamicTime';
import DynamicTagline from 'components/DynamicTagline';
import DynamicCurrentStatus from 'components/DynamicCurrentStatus';
import { useInitialProps } from 'services/context/initial-props';
import { getRandomItem } from 'services/utils';
import { TALKING_POINTS } from 'services/copy';

const talkingPoint = getRandomItem(TALKING_POINTS);

const About = () => {
  const { currentCity } = useInitialProps();

  return (
    <>
      <div>
        <Text as="p">
          I’m a{' '}
          <Text bold>
            <DynamicTagline />
          </Text>{' '}
          in my senior year of computer science at the University of Waterloo.
        </Text>
      </div>

      <div>
        <Text as="p">
          It’s currently{' '}
          <Text bold>
            <DynamicTime />
          </Text>{' '}
          for me in <Text bold>{currentCity}</Text>. <DynamicCurrentStatus />
        </Text>
      </div>

      <div>
        <Text as="p">
          Wanna chat about <Text bold>{talkingPoint}</Text>? Shoot me a message
          at <Link href="mailto:alex@xie.codes">alex@xie.codes</Link> and let's
          talk.
        </Text>
      </div>
    </>
  );
};

export default About;
