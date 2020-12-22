import { styled } from 'goober';
import { FC } from 'react';

import { useStoreFocusListeners } from 'services/store/utils';

type LinkProps = React.ComponentPropsWithoutRef<'a'> & { bare?: boolean };

const A = styled<LinkProps>('a')`
  font-size: 16px;
  font-family: 'Space Grotesk Variable', 'Space Grotesk', -apple-system,
    BlinkMacSystemFont, Roboto, Ubuntu, 'Helvetica Neue', sans-serif;
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
  const focusListeners = useStoreFocusListeners();

  return (
    <A bare={bare} {...focusListeners} {...rest}>
      {children as any}
    </A>
  );
};

export { Link };
