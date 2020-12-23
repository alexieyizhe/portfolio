import { styled } from 'goober';

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
