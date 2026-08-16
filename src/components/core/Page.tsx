import { FC, PropsWithChildren, useEffect } from 'react';
import { ThemeContextProvider, useTheme } from 'services/context/theme';
import { useSiteStore } from 'services/store';
import { s, screen } from 'services/style';

const PageContainer = s('div')`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-height: 100vh;
  width: 100vw;
  overflow: hidden;

  /* Guarantees breathing room above and below even on a viewport too short to
     centre the content, where the flex centring has no slack left to give. */
  padding: 48px 0;

  ${screen.mobile} {
    padding: 32px 0;
  }

  transition: background-color 400ms;
  background-color: ${({ theme }) => theme!.colors.background};
`;

const ContentContainer = s('main')`
  position: relative;
  width: 80vw;
  max-width: 510px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const useInitialize = () => {
  const { toggleDarkMode } = useTheme();
  const { toggleDisplayedSection } = useSiteStore();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // because next.js renders server-side, we cannot rely on these checks during initial render and must update them after
    // the room follows the visitor's own clock: daylight through the window from
    // 7am, lamplight the rest of the time
    const hour = new Date().getHours();
    toggleDarkMode(hour < 7 || hour >= 19);

    const isWorkPage = window.location.pathname === '/work';
    if (isWorkPage) toggleDisplayedSection('work');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

/**
 * Split out so the startup checks run underneath ThemeContextProvider. Called
 * from Page itself they would resolve useTheme against the default context,
 * whose toggleDarkMode is a no-op, and the time-of-day check would do nothing.
 */
const PageContent: FC<PropsWithChildren> = ({ children }) => {
  useInitialize();
  return (
    <PageContainer>
      <ContentContainer>{children}</ContentContainer>
    </PageContainer>
  );
};

export const Page: FC<PropsWithChildren> = ({ children }) => (
  <ThemeContextProvider>
    <PageContent>{children}</PageContent>
  </ThemeContextProvider>
);
