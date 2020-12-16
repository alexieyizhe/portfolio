import { styled } from 'goober';

export const Link = styled('a')`
  font-size: 16px;
  font-family: 'Space Grotesk', sans-serif;
  color: inherit;

  &:hover,
  &:focus-visible {
    text-decoration: none;
  }
`;
