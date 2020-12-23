import { styled } from 'goober';
import Head from 'next/head';
import { StoreContext } from 'storeon/preact';

import 'services/style';
import { createThemeStore } from 'services/store';
import DynamicFavicon from 'components/DynamicFavicon';
import { Text, AppContainer } from 'components/core';

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
      <DynamicFavicon />

      <StoreContext.Provider value={createThemeStore()}>
        <AppContainer>
          <Text>Seems like you're a bit lost.</Text>
          <NotFoundImg src="/spookyscary.png" />
        </AppContainer>
      </StoreContext.Provider>
    </>
  );
}
