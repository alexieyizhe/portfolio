import dynamic from 'next/dynamic';
import { styled } from 'goober';

import Title from 'components/Title';
import { screen } from 'services/style';
import { DARK_THEME, LIGHT_THEME, useTheme } from 'services/context/theme';

const MainIllustration = dynamic(() => import('components/MainIllustration'));

/** How much wider the scene runs than the text column it sits in. */
const SCENE = 1.38;

/**
 * The room is drawn in a square viewBox the art doesn't fill: it starts below
 * the top edge and stops above the bottom one. Held as fractions of the scene
 * so the crop survives any change of scale.
 */
const DEAD_TOP = 21.7 / 500;
const DEAD_BOTTOM = 36.1 / 500;

/**
 * Fades the top of the scene out so the greeting isn't competing with the
 * window's bright frame. Painted in the page background rather than black: at
 * night that darkens the frame, by day it lightens it, and either way the room
 * reads as emerging from underneath the heading.
 */
const shade = (color: string) =>
  `linear-gradient(to bottom,
     color-mix(in srgb, ${color} 98%, transparent) 0%,
     color-mix(in srgb, ${color} 80%, transparent) 38%,
     color-mix(in srgb, ${color} 45%, transparent) 58%,
     color-mix(in srgb, ${color} 15%, transparent) 76%,
     color-mix(in srgb, ${color} 0%, transparent) 100%)`;

const Scrim = styled('div')`
  position: absolute;
  left: 0;
  right: 0;
  top: -11%;
  height: 53%;
  pointer-events: none;
  transition: opacity 400ms;
`;

/**
 * The scene runs wider than the text column it sits in, and the greeting moves
 * inside it rather than above: centred over the window, which fills the left
 * half of the room. Both are sized in percentages of this box so the heading
 * stays put over the window at any scale.
 *
 * The negative margins pull in the dead bands so the page centres on the
 * drawing rather than on its bounding box. Margin percentages resolve against
 * the parent's width, hence each one is scaled by SCENE.
 */
const Container = styled('div')`
  position: relative;
  width: ${SCENE * 100}%;
  margin: ${-DEAD_TOP * SCENE * 100}% ${(1 - SCENE) * 50}%
    ${-DEAD_BOTTOM * SCENE * 100}%;
`;

/**
 * Full width so the greeting stays centred on the page, and high enough that it
 * only just clips the top corner of the window rather than sitting inside it.
 */
const TitleOverlay = styled('div')`
  position: absolute;
  z-index: 1;
  top: 7%;
  left: 0;
  width: 100%;

  & h1 {
    margin: 0;
    font-size: 46px;
  }

  ${screen.mobile} {
    & h1 {
      font-size: 32px;
    }
  }
`;

const Hero = () => {
  const { isDarkMode } = useTheme();

  return (
    <Container>
      <MainIllustration />
      {/*
        Two stacked layers cross-faded on opacity rather than one layer swapping
        colour: a gradient can't be transitioned, so recolouring it would snap
        the wash to the new theme while the page behind it was still easing
        over.
      */}
      <Scrim
        style={{
          background: shade(DARK_THEME.colors.background),
          opacity: isDarkMode ? 1 : 0,
        }}
      />
      <Scrim
        style={{
          background: shade(LIGHT_THEME.colors.background),
          opacity: isDarkMode ? 0 : 1,
        }}
      />
      <TitleOverlay>
        <Title />
      </TitleOverlay>
    </Container>
  );
};

export default Hero;
