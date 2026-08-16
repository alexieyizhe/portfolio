import dynamic from 'next/dynamic';
import { styled } from 'goober';

import Title from 'components/Title';
import { screen } from 'services/style';

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
 * The band over which the scene fades out, as fractions of its height. It
 * begins above the top edge so the greeting has an even field behind it.
 */
const FADE_TOP = -0.11;
const FADE_HEIGHT = 0.53;

/** How much of the scene shows through, from the top of that band down. */
const FADE = [
  [0, 0.02],
  [0.38, 0.2],
  [0.58, 0.55],
  [0.76, 0.85],
  [1, 1],
];

const fade = `linear-gradient(to bottom, ${FADE.map(
  ([at, shown]) =>
    `rgba(0, 0, 0, ${shown}) ${((FADE_TOP + at * FADE_HEIGHT) * 100).toFixed(2)}%`
).join(', ')})`;

/**
 * The greeting sits over the top of the room, so the room fades out underneath
 * it rather than competing with the window's bright frame.
 *
 * Masking the artwork away, rather than washing the page colour over it: a
 * wash has to be repainted whenever the theme changes, and a gradient can't be
 * transitioned, so the two never quite agree while the page eases from one
 * background to the other — which reads as a hard edge down each side of the
 * scene. A mask has nothing to keep in step, since what shows through is the
 * page itself, whatever colour it happens to be at that moment.
 */
const Scene = styled('div')`
  -webkit-mask-image: ${fade};
  mask-image: ${fade};
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

const Hero = () => (
  <Container>
    <Scene>
      <MainIllustration />
    </Scene>
    <TitleOverlay>
      <Title />
    </TitleOverlay>
  </Container>
);

export default Hero;
