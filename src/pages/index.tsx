import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { StoreContext } from 'storeon/preact';

import {
  getNowPlayingDataServerSide,
  StorageClient,
  StorageKey,
} from 'services/_server_';
import { createSiteStore } from 'services/store';
import { getGithubStats } from 'services/github';
import DynamicFavicon from 'components/DynamicFavicon';
import Title from 'components/Title';
import Bio from 'components/Bio';
import Footer from 'components/Footer';
import {
  AppContainer,
  ContentContainer,
  InnerContentContainer,
} from 'components/core';

export type TPageInitialProps = InferGetStaticPropsType<typeof getStaticProps>;

const MainIllustration = dynamic(() => import('components/MainIllustration'));

export default function IndexPage(initialProps: TPageInitialProps) {
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
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://alexxie.com/preview.png" />
      </Head>
      <DynamicFavicon />

      <StoreContext.Provider value={createSiteStore(initialProps)}>
        <AppContainer>
          <ContentContainer>
            <InnerContentContainer>
              <Title />
              <MainIllustration />
              <Bio />
              <Footer />
            </InnerContentContainer>
          </ContentContainer>
        </AppContainer>
      </StoreContext.Provider>
    </>
  );
}

export async function getStaticProps() {
  console.log('Retrieving data...');
  const client = new StorageClient();
  const { token: spotifyToken } = await client.getSpotifyCredentials();
  const currentTimezoneOffset = await client.getTimezoneOffset();
  const currentCity = await client.getCurrentCity();
  const customStatus = (await client.get(StorageKey.STATUS)) || null; // empty string means no status
  client.disconnect();

  const initialNowPlayingData = await getNowPlayingDataServerSide(spotifyToken);
  const githubStats = await getGithubStats();

  const initialProps = {
    initialNowPlayingData,
    githubStats,
    spotifyToken,
    currentTimezoneOffset,
    currentCity,
    customStatus,
  };

  return {
    props: initialProps,
    revalidate: 600,
  };
}
