import { styled } from 'goober';
import { FC } from 'react';

import { useSiteContext } from 'services/site/context';

type LinkProps = React.ComponentPropsWithoutRef<'a'> & { bare?: boolean };

const A = styled<LinkProps>('a')`
  font-size: 16px;
  font-family: 'Space Grotesk', sans-serif;
  color: inherit;

  cursor: pointer;
  transition: opacity 250ms;
  text-decoration: ${({ bare }) => (bare ? 'none' : 'underline')};

  &:hover,
  &:focus-visible {
    text-decoration: none;
    opacity: ${({ bare }) => (bare ? 0.8 : 1)};
  }
`;

const Link: FC<LinkProps> = ({ bare = false, children, ...rest }) => {
  const { setIsHoveringLink } = useSiteContext();

  return (
    <A
      bare={bare}
      onMouseEnter={() => setIsHoveringLink(true)}
      onMouseLeave={() => setIsHoveringLink(false)}
      {...rest}
    >
      {children}
    </A>
  );
};

export { Link };
