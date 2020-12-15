import { styled } from 'goober';
import Image from 'next/image';

import { CopyContextProvider } from 'services/copy';
import 'services/theme';
import Heading from 'components/Heading';
import Bio from 'components/Bio';
import Links from 'components/Links';

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

const App = () => (
  <CopyContextProvider>
    <AppContainer>
      <ContentContainer>
        <Heading />
        <Image src="/me.png" width={500} height={288} priority />
        <Bio />
        <Links />
      </ContentContainer>
    </AppContainer>
  </CopyContextProvider>
);

export default App;
