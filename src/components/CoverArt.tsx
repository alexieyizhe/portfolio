import { css } from 'goober';
import { FC, memo } from 'react';

import { useStoreFocusListeners } from 'services/store/utils';
import { screen } from 'services/utils';

type TCoverArtProps = { link: string; src: string };

const CoverArtLink = css`
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

    ${screen.mobile} {
      width: 16px;
      height: 16px;
    }
  }
`;

const CoverArt: FC<TCoverArtProps> = memo(({ link, src }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer noopener"
      className={CoverArtLink}
      {...useStoreFocusListeners()}
    >
      <img src={src} />
    </a>
  );
});

export default CoverArt;
