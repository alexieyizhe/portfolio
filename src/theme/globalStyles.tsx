import { createGlobalStyle } from "styled-components";

import PierSansBold from "~assets/fonts/PierSans-Bold.otf";
import PierSansBoldItalic from "~assets/fonts/PierSans-BoldItalic.otf";
import PierSansItalic from "~assets/fonts/PierSans-Italic.otf";
import PierSansRegular from "~assets/fonts/PierSans-Regular.otf";

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: "Pier Sans";
    font-weight: 600;
    src: url(${PierSansBold});
  }

  @font-face {
    font-family: "Pier Sans";
    font-weight: 600;
    font-style: italic;
    src: url(${PierSansBoldItalic});
  }

  @font-face {
    font-family: "Pier Sans";
    font-style: italic;
    src: url(${PierSansItalic});
  }

  @font-face {
    font-family: "Pier Sans";
    src: url(${PierSansRegular});
  }

  html, body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  *, *:before, *:after {
    box-sizing: inherit;
  }
`;

export default GlobalStyles;
