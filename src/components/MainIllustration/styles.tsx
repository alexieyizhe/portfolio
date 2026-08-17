import { styled } from 'goober';

/**
 * One tint for every shadow in the scene, so the figure grounds onto the same
 * floor as the pots and the cabinet. Translucent rather than a flat tone: the
 * shadows fall across the rug as well as the bare floor, and an opaque fill
 * blanks out whatever it lands on instead of darkening it.
 */
export const SHADOW = {
  light: { fill: '#6b5a4e', opacity: 0.13 },
  dark: { fill: '#8fa3ab', opacity: 0.1 },
};

export const Group = styled('g')`
  cursor: pointer;
  stroke-width: 1;

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: 1px solid blue;
  }
`;
