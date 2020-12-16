import { styled } from 'goober';
import { FC } from 'react';
import { useSiteContext } from 'services/site/context';

const A = styled('a')`
  font-size: 16px;
  font-family: 'Space Grotesk', sans-serif;
  color: inherit;

  cursor: pointer;
  text-decoration: underline;

  &:hover,
  &:focus-visible {
    text-decoration: none;
  }
`;

const Link: FC<React.ComponentPropsWithoutRef<'a'>> = ({ children }) => {
  const { setIsHoveringLink } = useSiteContext();

  return (
    <A
      onMouseEnter={() => setIsHoveringLink(true)}
      onMouseLeave={() => setIsHoveringLink(false)}
    >
      {children}
    </A>
  );
};

export { Link };
