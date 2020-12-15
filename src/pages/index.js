import { styled } from 'goober';
import Image from 'next/image';

import Heading from 'components/Heading';
import Bio from 'components/Bio';
import Links from 'components/Links';
import NowPlayingContext, { fetchNowPlaying } from 'services/now-playing';
import 'services/theme';

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

const IndexPage = ({ nowPlayingData }) => {
  console.log(nowPlayingData);
  return (
    <NowPlayingContext.Provider value={nowPlayingData}>
      <AppContainer>
        <ContentContainer>
          <Heading />
          <Image src="/me.png" width={500} height={288} priority />
          <Bio />
          <Links />
        </ContentContainer>
      </AppContainer>
    </NowPlayingContext.Provider>
  );
};

export async function getStaticProps() {
  const nowPlayingData = await fetchNowPlaying();

  return {
    props: {
      nowPlayingData,
    },
  };
}

export default IndexPage;
