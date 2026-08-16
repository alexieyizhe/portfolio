import { Link, Text } from 'components/core';
import DynamicTagline from 'components/DynamicTagline';
import DynamicCurrentStatus from 'components/DynamicCurrentStatus';
import { useInitialProps } from 'services/context/initial-props';
import { EXPERIENCE_BLURB } from 'services/copy';

const About = () => {
  const { talkingPoint } = useInitialProps();

  return (
    <>
      <div>
        <Text as="p">
          I’m a{' '}
          <Text bold>
            <DynamicTagline />
          </Text>{' '}
          {EXPERIENCE_BLURB}.
        </Text>
      </div>

      <div>
        <Text as="p">
          <DynamicCurrentStatus />
        </Text>
      </div>

      <div>
        <Text as="p">
          Wanna chat about <Text bold>{talkingPoint}</Text>? Shoot me a message
          at <Link href="mailto:hey@alexxie.com">hey@alexxie.com</Link> and
          let's talk.
        </Text>
      </div>
    </>
  );
};

export default About;
