import { memo, FC } from 'react';

import { s } from 'services/style';
import { H1 } from 'components/core';
import { useEasterEggActive, useGreeting } from 'services/store/new';

const Container = s('header')`
  & > h1.eeActive {
    font-family: ${({ theme }) => theme!.easterEggFont} !important;
  }
`;

const Title: FC = memo(() => {
  const greeting = useGreeting();
  const isEasterEggActive = useEasterEggActive();

  return (
    <Container>
      <H1 className={isEasterEggActive ? 'eeActive' : undefined}>{greeting}</H1>
    </Container>
  );
});

export default Title;
