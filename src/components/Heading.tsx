import { h, FunctionalComponent } from 'preact';
import { styled } from 'goober';

import { MainImg } from 'assets';
import { useCopyContext } from 'services/copy';

const H1 = styled('h1')`
  color: lightblue;
`;

const Heading: FunctionalComponent = () => {
  const { greeting } = useCopyContext();
  return <H1>{greeting}</H1>;
};

export default Heading;
