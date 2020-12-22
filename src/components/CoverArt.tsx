import { styled } from 'goober';
import { FC, memo } from 'react';

import { useStoreFocusListeners } from 'services/store/utils';

type TCoverArtProps = { link: string; src: string };

const CoverArtLink = styled('a')`
  position: relative;
  display: inline-block;

  transition: transform 250ms;
  &:hover {
    transform: scale(1.1);
  }

  & img {
    width: 18px;
    height: 18px;
    border-radius: 3px;
    transform: translateY(1px);
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
`;

const CoverArt: FC<TCoverArtProps> = memo(({ link, src }) => {
  return (
    <CoverArtLink
      href={link}
      target="_blank"
      rel="noreferrer noopener"
      {...useStoreFocusListeners()}
    >
      <img src={src} />
    </CoverArtLink>
  );
});

export default CoverArt;
