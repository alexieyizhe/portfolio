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
          {EXPERIENCE_BLURB}
        </Text>
      </div>

      <div>
        <Text as="p">
          <DynamicCurrentStatus />
        </Text>
      </div>

      <div>
        <Text as="p">
          Wanna chat about <Text bold>{talkingPoint}</Text>?{' '}
          <Link href="mailto:hi@alexxie.com">Get in touch</Link>.
        </Text>
      </div>
    </>
  );
};

export default About;
