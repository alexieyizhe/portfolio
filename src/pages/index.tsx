import { styled } from 'goober';
import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { createCanvas, Image as CanvasImage } from 'canvas';

import Heading from 'components/Heading';
import Bio from 'components/Bio';
import Links from 'components/Links';
import { SiteContextProvider } from 'services/site/context';
import 'services/theme';
import { requestNowPlayingData } from 'services/now-playing/server';
import { StorageClient, StorageKey } from 'services/storage';
import DynamicFavicon from 'components/DynamicFavicon';

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

const serversideColorOptions = {
  canvasBuilder: () => createCanvas(64, 64),
  imageClass: CanvasImage,
};

export async function getStaticProps() {
  console.debug('Retreving now playing data and timezone...');
  const client = new StorageClient();
  const { nowPlayingData, spotifyToken } = await requestNowPlayingData(
    client,
    serversideColorOptions
  );
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
