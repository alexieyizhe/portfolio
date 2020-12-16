import { h } from 'preact';
import { setup, glob } from 'goober';

setup(h);

glob`
  @font-face {
    font-family: 'Space Grotesk';
    font-weight: 100 1000;
    font-display: swap;
    src: url('/fonts/SpaceGrotesk-VariableFont_wght.ttf')  format('truetype supports variations'),
    url('/fonts/SpaceGrotesk-VariableFont_wght.ttf')  format('truetype-variations'); 
  }

  @font-face {
    font-family: 'Verona Serial';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('/fonts/verona-serial-medium-regular.ttf') format('truetype');
  }

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
