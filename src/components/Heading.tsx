import { memo, FC } from 'react';
import { styled } from 'goober';

import { useSiteStore } from 'services/store';

const H1 = styled('h1')`
  font-family: 'Verona Serial', 'Franklin Gothic Medium', Arial, serif;
  font-size: 48px;
  text-align: center;
  margin-bottom: 32px;

  @media only screen and (max-width: 600px) {
    font-size: 40px;
  }
`;

const Heading: FC = memo(() => {
  const { greeting } = useSiteStore('greeting');
  return <H1>{greeting}</H1>;
});

export default Heading;
