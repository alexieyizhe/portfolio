import { memo } from 'react';

import TextLoop from 'components/TextLoop';
import { useInitialProps } from 'services/context/initial-props';

const DynamicTagline = memo(() => {
  const { taglines } = useInitialProps();

  return <TextLoop>{taglines}</TextLoop>;
});

export default DynamicTagline;
