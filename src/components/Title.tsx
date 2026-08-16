import { memo, FC } from 'react';

import { H1 } from 'components/core';
import { useSiteStore } from 'services/store';
import { useInitialProps } from 'services/context/initial-props';
import { useTheme } from 'services/context/theme';

const Title: FC = memo(() => {
  const { greeting } = useInitialProps();
  const { headingFont } = useTheme();
  const isEasterEggActive = useSiteStore((state) => state.isEasterEggActive);

  return (
    <H1
      style={
        isEasterEggActive
          ? { fontFamily: `Comic Sans MS, ${headingFont}` }
          : undefined
      }
    >
      {greeting}
    </H1>
  );
});

export default Title;
