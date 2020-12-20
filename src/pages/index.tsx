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
import { SiteContextProvider } from 'services/site/context';
import DynamicFavicon from 'components/DynamicFavicon';
import Heading from 'components/Heading';
import Bio from 'components/Bio';
import Links from 'components/Links';

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

const IndexPage = (props: TPageProps) => (
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

export async function getStaticProps() {
  console.log('Retrieving now playing data and timezone...');
  const client = new StorageClient();
  const { token } = await client.getSpotifyCredentials();
  const currentOffset = await client.getTimezoneOffset();
  const currentCity = await client.getCurrentCity();
  const customStatus = (await client.get(StorageKey.STATUS)) || null; // empty string means no status
  client.disconnect();

  const nowPlayingData = await getNowPlayingDataServerSide(token);

  return {
    props: {
      nowPlayingData,
      spotifyToken: token,
      currentOffset,
      currentCity,
      customStatus,
    },
    revalidate: 10, // regenerate page at most every N seconds
  };
}

export default IndexPage;
