import { css, keyframes } from 'goober';
import { FC, memo } from 'react';

import { TNowPlayingData } from 'services/api';
import { useStoreFocusListeners } from 'services/utils';
import { screen } from 'services/style';
import { useTheme } from 'services/context/theme';

type TCoverArtProps = Pick<TNowPlayingData, 'link' | 'coverArtSrc'> & {
  color: string | undefined;
  isPodcast: boolean;
};

const rotate = keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
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

    &.podcast {
      animation: none;

      & span {
        display: none;
      }

      & img {
        border-radius: 4px;
      }
    }
  }
`;

const CoverArt: FC<TCoverArtProps> = memo(
  ({ link, coverArtSrc, color, isPodcast }) => {
    const { colors } = useTheme();
    return (
      <a
        href={link}
        target="_blank"
        rel="noreferrer noopener"
        className={CoverArtLink}
        {...useStoreFocusListeners()}
      >
        <div style={{ color }} className={isPodcast ? 'podcast' : 'music'}>
          <img src={coverArtSrc} />
          <span style={{ background: colors.background }} />
        </div>
      </a>
    );
  }
);

export default CoverArt;
