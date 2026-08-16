import { createElement } from 'react';
import { setup, styled } from 'goober';
import { prefix } from 'goober-autoprefixer';

import { useTheme, TTheme } from 'services/context/theme';

// fixes `goober` bug where TS thinks `theme` isn't defined as a prop
export const s = <P extends Record<string, unknown>>(
  tag: keyof React.JSX.IntrinsicElements
) => styled<{ theme?: TTheme } & P>(tag);

export const screen = {
  mobile: '@media only screen and (max-width: 600px)',
};

setup(createElement, prefix, useTheme);
