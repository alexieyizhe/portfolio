import { styled } from 'goober';
import Head from 'next/head';
import { StoreContext } from 'storeon/preact';

import 'services/style';
import { createThemeStore } from 'services/store';
import DynamicFavicon from 'components/DynamicFavicon';
import { Text, AppContainer, ContentContainer } from 'components/core';

const NotFoundImg = styled('img')`
  margin-top: 1em;
  width: 200px;
  max-width: 80vw;
`;

export default function NotFoundPage() {
  return (
    <>
      <Head>
        <title>There's nothing here.</title>
      </Head>
      <DynamicFavicon face="mad" />

      <StoreContext.Provider value={createThemeStore()}>
        <AppContainer>
          <ContentContainer>
            <Text>Seems like you're a bit lost.</Text>
            <NotFoundImg src="/spookyscary.png" />
          </ContentContainer>
        </AppContainer>
      </StoreContext.Provider>
    </>
  );
}
