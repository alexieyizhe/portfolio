import { s, screen } from 'services/style';

export const AppContainer = s('div')`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme!.colors.background};
  transition: background-color 400ms;
`;

export const ContentContainer = s('div')`
  position: relative;
  width: 100vw;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${screen.mobile} {
    min-height: unset;
  }
`;

export const InnerContentContainer = s('main')`
  position: relative;
  width: 100%;
  height: 100%;
  width: 80vw;
  max-width: 510px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
