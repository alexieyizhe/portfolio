import { styled } from 'goober';
import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';

import Heading from 'components/Heading';
import Bio from 'components/Bio';
import Links from 'components/Links';
import { SiteContextProvider } from 'services/site/context';
import 'services/theme';
import { getNowPlayingData } from 'services/now-playing';
import { createStorageClient, StorageKey } from 'services/storage';
import { useState } from 'react';
import { useVisibilityChange } from 'services/utils';
import { prominent } from 'services/color';

const MeIllustration = dynamic(() => import('components/MeIllustration'));

const AppContainer = styled('div')`
  position: relative;
  width: 100vw;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ContentContainer = styled('main')`
  position: relative;
  width: 100%;
  height: 100%;
  width: 80vw;
  max-width: 500px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const IndexPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [isAway, setAway] = useState(false);

  useVisibilityChange(setAway);

  return (
    <>
      <Head>
        <title>Alex Xie</title>
        <meta property="og:title" content="Alex Xie's personal website" />
        <meta
          name="description"
          content="Alex is a web developer and a senior at the University of Waterloo, majoring in computer science."
        />
        <meta
          property="og:description"
          content="Alex is a web developer and a senior at the University of Waterloo, majoring in computer science."
        />
        <link
          rel="shortcut icon"
          type="image/png"
          href={isAway ? '/favicon-away.png' : '/favicon.png'}
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://alexxie.com/preview.png" />
      </Head>

      <SiteContextProvider {...props}>
        <AppContainer>
          <ContentContainer>
            <Heading />
            <MeIllustration />
            <Bio />
            <Links />
          </ContentContainer>
        </AppContainer>
      </SiteContextProvider>
    </>
  );
};

export async function getStaticProps() {
  const client = createStorageClient();
  console.debug('Retreving now playing data and timezone...');
  const { nowPlayingData, spotifyToken } = await getNowPlayingData(client);
  const currentTimeZone = await client.get(StorageKey.CURRENT_IANA_TIMEZONE);
  const customStatus = await client.get(StorageKey.STATUS);
  client.disconnect();

  return {
    props: {
      nowPlayingData,
      spotifyToken,
      currentTimeZone,
      customStatus,
    },
    revalidate: 60, // regenerate page at most every minute
  };
}

export default IndexPage;
