import { styled } from 'goober';
import Image from 'next/image';

import Heading from 'components/Heading';
import Bio from 'components/Bio';
import Links from 'components/Links';
import NowPlayingContext, { fetchNowPlaying } from 'services/now-playing';
import 'services/theme';
import { requestNewToken } from '../services/now-playing';

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
  const Redis = require('ioredis'); // TODO: maybe move this to its own service?
  let client = new Redis(
    'redis://:e22f6050ce1449d7962e9f7edd053940@us1-apparent-grouper-31548.lambda.store:31548',
    {
      enableAutoPipelining: true,
    }
  );

  const accessTokenExpiry = await client.get('access-token-expiry');
  console.log(new Date(Number(accessTokenExpiry)).toLocaleString());
  if (Number(accessTokenExpiry) < Date.now()) {
    console.log('access token expired, requesting new');
    const { access_token } = await requestNewToken();
    await client.set('access-token', access_token);
    await client.set('access-token-expiry', Date.now() + 3600 * 1000); // spotify tokens expire in an hour
    console.log(
      `set accesss token ${access_token} expiry to ${new Date(
        Date.now() + 3600 * 1000
      ).toLocaleDateString()}`
    );
  }

  const accessToken = await client.get('access-token');
  const nowPlayingData = await fetchNowPlaying(accessToken);

  client.disconnect();

  // todo: clean this up
  return {
    props:
      nowPlayingData !== undefined
        ? {
            nowPlayingData,
          }
        : {},
  };
}

export default IndexPage;
