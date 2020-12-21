import { styled } from 'goober';
import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';

import {
  getNowPlayingDataServerSide,
  StorageClient,
  StorageKey,
} from 'services/_server_';

import 'services/theme';
import { createSiteStore } from 'services/site/store';
import DynamicFavicon from 'components/DynamicFavicon';
import Heading from 'components/Heading';
import Bio from 'components/Bio';
import Footer from 'components/Footer';
import { StoreContext } from 'storeon/preact';
import { TNowPlayingData } from 'services/now-playing';

type TPageInitialProps = {
  initialNowPlayingData: TNowPlayingData | null;
  spotifyToken: string | null;
  currentTimezoneOffset: string;
  currentCity: string;
  customStatus: string | null;
};

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

export type TPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const IndexPage = ({ store }: TPageProps) => (
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

    <StoreContext.Provider value={store}>
      <AppContainer>
        <ContentContainer>
          <Heading />
          <MeIllustration />
          <Bio />
          <Footer />
        </ContentContainer>
      </AppContainer>
    </StoreContext.Provider>
  </>
);

async function getStaticProps() {
  console.log('Retrieving now playing data and timezone...');
  const client = new StorageClient();
  const { token: spotifyToken } = await client.getSpotifyCredentials();
  const currentTimezoneOffset = await client.getTimezoneOffset();
  const currentCity = await client.getCurrentCity();
  const customStatus = (await client.get(StorageKey.STATUS)) || null; // empty string means no status
  client.disconnect();

  const initialNowPlayingData = await getNowPlayingDataServerSide(spotifyToken);

  const initialProps: TPageInitialProps = {
    initialNowPlayingData,
    spotifyToken,
    currentTimezoneOffset,
    currentCity,
    customStatus,
  };

  return {
    props: {
      store: createSiteStore(initialProps),
    },
    revalidate: 10, // regenerate page at most every N seconds
  };
}

export type { TPageInitialProps };
export { getStaticProps };
export default IndexPage;
