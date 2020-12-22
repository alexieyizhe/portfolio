import { ComponentPropsWithoutRef } from 'react';

import { screen } from 'services/utils';
import { s } from 'services/theme';

// the `as` prop isn't typed by Goober for some reason, but it exists (https://github.com/cristianbote/goober#using-as-prop)
type TTextProps = {
  as?: keyof JSX.IntrinsicElements;
  bold?: boolean;
  italic?: boolean;
} & ComponentPropsWithoutRef<'span'>;

const Text = s<TTextProps>('span')`
  color: ${({ theme, color }) => color ?? theme!.textPrimaryColor};
  font-family: ${({ theme }) => theme!.bodyFont};
  font-size: 16px;

  ${({ bold }) => (bold ? `font-weight: 500;` : '')}
  ${({ italic }) => (italic ? `font-style: italic;` : '')}

  ${screen.mobile} {
    font-size: 15px;
  }
`;

export { Text };
