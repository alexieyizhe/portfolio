import { FunctionalComponent } from 'preact';
import { styled } from 'goober';

import { useCopyContext } from 'services/copy';
// import { Text } from 'components/core';
import DynamicTime from 'components/DynamicTime';
import DynamicTagline from 'components/DynamicTagline';
import DynamicCurrentStatus from 'components/DynamicCurrentStatus';

const Container = styled('div')`
  margin-top: 1em;
`;

const Bio: FunctionalComponent = () => {
  const { talkingPoint } = useCopyContext();

  return (
    <Container>
      <p>
        I’m a <DynamicTagline /> studying computer science at the University of
        Waterloo.
      </p>
      <path>
        It’s currently <DynamicTime /> for me and I'm <DynamicCurrentStatus />
      </path>
      <p>
        Wanna chat about {talkingPoint}? Lets talk. You can reach me at{' '}
        <a href="mailto:hi@alexxie.com">hi@alexxie.com</a>.
      </p>
    </Container>
  );
};

export default Bio;
