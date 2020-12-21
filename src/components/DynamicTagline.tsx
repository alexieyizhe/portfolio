import { memo, FC } from 'react';
import TextLoop from 'react-text-loop';

import { useSiteContext } from 'services/site/store';

const DynamicTagline: FC = memo(() => {
  const { taglines } = useSiteContext();

  return <TextLoop children={taglines} />;
});

export default DynamicTagline;
