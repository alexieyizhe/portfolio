import { memo, FC } from 'react';
import { styled } from 'goober';

import { useSiteStore } from 'services/store';
import { screen } from 'services/utils';

const H1 = styled('h1')`
  font-family: 'Verona Serial', 'Franklin Gothic Medium', Arial, serif;
  font-size: 48px;
  text-align: center;
  margin: 48px 0;

  ${screen.mobile} {
    font-size: 40px;
    margin: 0;
  }
`;

const Heading: FC = memo(() => {
  const { greeting } = useSiteStore('greeting');
  return <H1>{greeting}</H1>;
});

export default Heading;
