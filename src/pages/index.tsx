import { styled } from 'goober';
import Image from 'next/image';

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

const IndexPage = ({ nowPlayingData, currentTimeZone }) => {
  return (
    <CopyContext.Provider
      value={{
        greeting: getRandomItem(GREETINGS),
        taglines: TAGLINES,
        currentDate: getDateInZone(currentTimeZone),
        nowPlaying: nowPlayingData,
        activity: getRandomItem(ACTIVITIES),
        talkingPoint: getRandomItem(TALKING_POINTS),
      }}
    >
      <AppContainer>
        <ContentContainer>
          <Heading />
          <Image src="/me.png" width={500} height={288} priority />
          <Bio />
          <Links />
        </ContentContainer>
      </AppContainer>
    </CopyContext.Provider>
  );
};

export async function getStaticProps() {
  const client = createStorageClient();
  const nowPlayingData = await getNowPlayingData(client);
  const currentTimeZone = await client.get(StorageKey.CURRENT_IANA_TIMEZONE);
  client.disconnect();

  return {
    props: {
      nowPlayingData,
      currentTimeZone,
    },
    revalidate: 60, // regenerate page at most every minute
  };
}

export default IndexPage;
