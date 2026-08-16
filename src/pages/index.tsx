import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';

import {
  getNowPlayingDataServerSide,
  StorageClient,
  StorageKey,
} from 'services/_server_';
import DynamicFavicon from 'components/DynamicFavicon';
import Hero from 'components/Hero';
import Bio from 'components/Bio';
import Footer from 'components/Footer';
import { Page } from 'components/core';
import { InitialPropsContextProvider } from 'services/context/initial-props';
import { getRandomItem, getShuffledArray } from 'services/utils';
import {
  GREETINGS,
  ILLUSTRATION_CREDITS,
  SITE_DESCRIPTION,
  TAGLINES,
  TALKING_POINTS,
} from 'services/copy';

export type TPageInitialProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function IndexPage(initialProps: TPageInitialProps) {
  return (
    <>
      <Head>
        <title>Alex Xie</title>
        <meta property="og:title" content="Alex Xie's personal website" />
        <meta name="description" content={SITE_DESCRIPTION} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://alexxie.com/preview.png" />
        <meta
          name="attribution"
          content={`Illustrations: ${ILLUSTRATION_CREDITS}`}
        />
      </Head>
      <DynamicFavicon />

      <InitialPropsContextProvider value={initialProps}>
        <Page>
          <Hero />
          <Bio />
          <Footer />
        </Page>
      </InitialPropsContextProvider>
    </>
  );
}

export async function getStaticProps() {
  console.log('Retrieving data...');
  const client = new StorageClient();
  const { token: spotifyToken } = await client.getSpotifyCredentials();
  const timezoneOffset = await client.getTimezoneOffset();
  const currentCity = await client.getCurrentCity();
  const customStatus = (await client.get(StorageKey.STATUS)) || null; // empty string means no status
  client.disconnect();

  const initialNowPlayingData = await getNowPlayingDataServerSide(spotifyToken);

  const initialProps = {
    initialNowPlayingData,
    spotifyToken,
    timezoneOffset,
    currentCity,
    customStatus,
    // randomized server-side so SSR output and client hydration agree
    greeting: getRandomItem(GREETINGS),
    talkingPoint: getRandomItem(TALKING_POINTS),
    taglines: getShuffledArray([...TAGLINES]),
  };

  console.log('Retrieved initial props of', initialProps);

  return {
    props: initialProps,
    revalidate: 60,
  };
}
