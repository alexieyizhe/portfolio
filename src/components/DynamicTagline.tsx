import { memo } from 'react';
import TextLoop from 'react-text-loop';

import { useInitialProps } from 'services/context/initial-props';

const DynamicTagline = memo(() => {
  const { taglines } = useInitialProps();

  return <TextLoop children={taglines} />;
});

export default DynamicTagline;
