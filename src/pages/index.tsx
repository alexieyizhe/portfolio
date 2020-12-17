import { styled } from 'goober';
import { InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';

import Heading from 'components/Heading';
import Bio from 'components/Bio';
import Links from 'components/Links';
import { SiteContextProvider } from 'services/site/context';
import 'services/theme';
import { getNowPlayingData } from 'services/now-playing';
import { createStorageClient, StorageKey } from 'services/storage';

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

const IndexPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
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
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />
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

export async function getServerSideProps() {
  const client = createStorageClient();
  console.debug('Retreving now playing data and timezone...');
  const nowPlayingData = await getNowPlayingData(client);
  const currentTimeZone = await client.get(StorageKey.CURRENT_IANA_TIMEZONE);
  const customStatus = await client.get(StorageKey.STATUS);
  client.disconnect();

  return {
    props: {
      nowPlayingData,
      currentTimeZone,
      customStatus,
    },
    revalidate: 10, // regenerate page at most every 10 seconds
  };
}

export default IndexPage;
