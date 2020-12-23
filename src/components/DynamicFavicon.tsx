import Head from 'next/head';
import { useState, FC } from 'react';

import { useVisibilityChange } from 'services/utils';

const DynamicFavicon: FC<{ face?: 'smile' | 'mad' }> = ({ face }) => {
  const [isAway, setAway] = useState(false);
  useVisibilityChange(setAway);

  const dynamicFace = face ?? isAway ? 'mad' : 'smile';
  const href = dynamicFace === 'mad' ? '/favicon-away.png' : '/favicon.png';

  return (
    <Head>
      <link rel="shortcut icon" type="image/png" href={href} />
    </Head>
  );
};

export default DynamicFavicon;
