import Head from 'next/head';
import { useState, FC } from 'react';

import { useVisibilityChange } from 'services/utils';

const DynamicFavicon: FC = () => {
  const [isAway, setAway] = useState(false);
  useVisibilityChange(setAway);

  return (
    <Head>
      <link
        rel="shortcut icon"
        type="image/png"
        href={isAway ? '/favicon-away.png' : '/favicon.png'}
      />
    </Head>
  );
};

export default DynamicFavicon;
