import { styled } from 'goober';
import { FC, memo } from 'react';

import { useStoreFocusListeners } from 'services/utils';
import { screen } from 'services/style';

type LinkProps = React.ComponentPropsWithoutRef<'a'> & {
  bare?: boolean;
  newTab?: boolean;
};

const A = styled<LinkProps>('a')`
  color: inherit;
  cursor: pointer;
  transition: opacity 250ms;
  text-decoration: ${({ bare }) => (bare ? 'none' : 'underline')};

  &:hover {
    text-decoration: none;
    opacity: ${({ bare }) => (bare ? 0.65 : 1)};
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: 1px solid blue;
  }

  ${screen.mobile} {
    font-size: 15px;
  }
`;

export const Link: FC<LinkProps> = memo(
  ({ bare = false, newTab = false, children, ...rest }) => {
    const focusListeners = useStoreFocusListeners();

    return (
      <A
        bare={bare}
        {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...focusListeners}
        {...rest}
      >
        {children as any}
      </A>
    );
  }
);
