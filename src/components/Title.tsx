import { memo, FC } from 'react';

import { useStore } from 'services/store';
import { s } from 'services/theme';
import { H1 } from 'components/core';

const Container = s('header')`
  & > h1.eeActive {
    font-family: ${({ theme }) => theme!.easterEggFont} !important;
  }
`;

const Title: FC = memo(() => {
  const { greeting, isEasterEggActive } = useStore(
    'greeting',
    'isEasterEggActive'
  );
  return (
    <Container>
      <H1 className={isEasterEggActive ? 'eeActive' : undefined}>{greeting}</H1>
    </Container>
  );
});

export default Title;
