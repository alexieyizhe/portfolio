import { memo, FC } from 'react';

import { H1 } from 'components/core';
import { useInitialProps } from 'services/context/initial-props';

const Title: FC = memo(() => {
  const { greeting } = useInitialProps();

  return <H1>{greeting}</H1>;
});

export default Title;
