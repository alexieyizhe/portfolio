import { memo, FC } from 'react';
import TextLoop from 'react-text-loop';

import { useTaglines } from 'services/store/new';

const DynamicTagline: FC = memo(() => {
  const taglines = useTaglines();

  return <TextLoop children={taglines} />;
});

export default DynamicTagline;
