import { FC, memo } from 'react';
import { useSiteStore } from 'services/store';

import Layers from './layers';

const Face: FC<{ isHovering: boolean }> = memo(({ isHovering }) => {
  const isInterested = useSiteStore((state) => state.isInterested);
  const expression = isInterested
    ? Layers.SURPRISED
    : isHovering
    ? Layers.WEIRD
    : Layers.GRIN_HAPPY;

  return (
    <g id="Face" transform="translate(499 178)">
      {expression}
    </g>
  );
});

export default Face;
