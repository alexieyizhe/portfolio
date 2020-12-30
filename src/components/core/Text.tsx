import { ComponentPropsWithoutRef } from 'react';

import { TThemeColor } from 'services/context/theme';
import { s, screen } from 'services/style';

// the `as` prop isn't typed by Goober for some reason, but it exists (https://github.com/cristianbote/goober#using-as-prop)
type TTextProps = {
  as?: keyof JSX.IntrinsicElements;
  bold?: boolean;
  italic?: boolean;
  color?: string;
} & ComponentPropsWithoutRef<'span'>;

export const Text = s<TTextProps>('span')`
  color: ${({ theme, color }) =>
    color
      ? theme!.colors[color as TThemeColor] ?? color
      : theme!.colors.textPrimary};
  font-family: ${({ theme }) => theme!.bodyFont};
  font-size: 16px;

  ${({ bold }) => (bold ? `font-weight: 500;` : '')}
  ${({ italic }) => (italic ? `font-style: italic;` : '')}

  ${screen.mobile} {
    font-size: 15px;
  }
`;
