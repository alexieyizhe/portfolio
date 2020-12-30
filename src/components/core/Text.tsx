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

export const H1 = s('h1')`
  font-family: ${({ theme }) => theme!.headingFont};
  color: ${({ theme }) => theme!.colors.textPrimary};
  font-size: 48px;
  text-align: center;
  margin: 48px 0;

  ${screen.mobile} {
    font-size: 40px;
    margin: 24px 0 28px 0;
  }
`;
