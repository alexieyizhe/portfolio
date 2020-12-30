import { memo, FC } from 'react';

import { H1 } from 'components/core';
import { useSiteStore } from 'services/store';
import { getRandomItem } from 'services/utils';
import { GREETINGS } from 'services/copy';
import { useTheme } from 'services/context/theme';

const greeting = getRandomItem(GREETINGS);

const Title: FC = memo(() => {
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
