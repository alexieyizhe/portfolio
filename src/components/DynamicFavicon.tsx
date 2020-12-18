import { useState, FC } from 'react';
import Head from 'next/head';

import { useVisibilityChange } from 'services/utils';

const DynamicFavicon: FC = () => {
  const [isAway, setAway] = useState(false);
  useVisibilityChange(setAway);

  return isAway ? (
    <Head>
      <link rel="shortcut icon" type="image/png" href="/favicon-away.png" />
    </Head>
  ) : (
    <Head>
      <link rel="shortcut icon" type="image/png" href="/favicon.png" />
    </Head>
  );
};

export default DynamicFavicon;
