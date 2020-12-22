import { memo, FC } from 'react';
import TextLoop from 'react-text-loop';

import { useStore } from 'services/store';

const DynamicTagline: FC = memo(() => {
  const { taglines } = useStore('taglines');

  return <TextLoop children={taglines} />;
});

export default DynamicTagline;
