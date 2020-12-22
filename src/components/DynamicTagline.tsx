import { memo, FC } from 'react';
import TextLoop from 'react-text-loop';

import { useSiteStore } from 'services/store';

const DynamicTagline: FC = memo(() => {
  const { taglines } = useSiteStore('taglines');

  return <TextLoop children={taglines} />;
});

export default DynamicTagline;
