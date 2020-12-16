import { styled } from 'goober';
import Image from 'next/image';
import Head from 'next/head';

import Heading from 'components/Heading';
import Bio from 'components/Bio';
import Links from 'components/Links';
import CopyContext from 'services/copy';
import 'services/theme';
import { getDateInZone, getRandomItem } from 'services/utils';
import {
  ACTIVITIES,
  GREETINGS,
  TAGLINES,
  TALKING_POINTS,
} from 'services/copy/config';
import { getNowPlayingData } from 'services/now-playing';
import { createStorageClient, StorageKey } from 'services/storage';

const AppContainer = styled('div')`
  position: relative;
  width: 100vw;
  height: 100vh;

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

const IndexPage = ({ nowPlayingData, currentTimeZone, customStatus }) => {
  return (
    <>
      <Head>
        <title>Alex Xie</title>
        <meta
          property="og:title"
          content="Alex Xie's personal website"
          key="title"
        />
        <meta
          name="description"
          content="Alex Xie is a web developer and a senior at the University of Waterloo, majoring in computer science."
        />
        <meta
          property="og:description"
          content="Alex Xie is a web developer and a senior at the University of Waterloo, majoring in computer science."
        />
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />

        <meta property="og:type" content="website" />
      </Head>

      <CopyContext.Provider
        value={{
          greeting: getRandomItem(GREETINGS),
          taglines: TAGLINES,
          currentDate: getDateInZone(currentTimeZone),
          nowPlaying: nowPlayingData,
          activity: customStatus ?? getRandomItem(ACTIVITIES),
          talkingPoint: getRandomItem(TALKING_POINTS),
        }}
      >
        <AppContainer>
          <ContentContainer>
            <Heading />
            <Image src="/me-2.png" width={300} height={250} priority />
            <Bio />
            <Links />
          </ContentContainer>
        </AppContainer>
      </CopyContext.Provider>
    </>
  );
};

export async function getStaticProps() {
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
    revalidate: 60, // regenerate page at most every minute
  };
}

export default IndexPage;
