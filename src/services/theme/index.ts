import { h } from 'preact';
import { setup, glob } from 'goober';

setup(h);

glob`
  html {
    height: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }
`;

export const theme = {};
