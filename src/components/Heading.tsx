import { h, FunctionalComponent } from 'preact';
import { styled } from 'goober';

import { useCopyContext } from 'services/copy';

const H1 = styled('h1')`
  font-family: 'Verona Serial', 'Franklin Gothic Medium', Arial, sans-serif;
  font-size: 48px;
  text-align: center;
  margin-bottom: 16px;
`;

const Heading: FunctionalComponent = () => {
  const { greeting } = useCopyContext();
  return <H1>{greeting}</H1>;
};

export default Heading;
