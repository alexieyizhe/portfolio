import { css, keyframes } from 'goober';
import { FC, memo } from 'react';

import { useStoreFocusListeners } from 'services/store/utils';
import { screen } from 'services/style';

type TCoverArtProps = { link: string; src: string; color: string };

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`;

const CoverArtLink = css`
  position: relative;
  display: inline-block;

  transition: transform 250ms;
  &:hover {
    transform: scale(1.1);
  }

  & div {
    display: grid;
    justify-content: center;
    align-items: center;

    animation: ${rotate} 5s linear infinite;

    @media (prefers-reduced-motion) {
      animation: none;
    }

    & > * {
      grid-row: 1;
      grid-column: 1;
    }

    & span {
      z-index: 3;
      width: 6px;
      height: 6px;
      border: 0.5px solid;
      border-radius: 50%;
      background: white;
      opacity: 0.8;
      margin: auto;
    }

    & img {
      z-index: 2;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 0.5px solid;
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

      ${screen.mobile} {
        width: 16px;
        height: 16px;
      }
    }
  }
`;

const CoverArt: FC<TCoverArtProps> = memo(({ link, src, color }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer noopener"
      className={CoverArtLink}
      {...useStoreFocusListeners()}
    >
      <div style={{ color }}>
        <img src={src} />
        <span />
      </div>
    </a>
  );
});

export default CoverArt;
