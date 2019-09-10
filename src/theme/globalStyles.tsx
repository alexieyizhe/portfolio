import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    font-family: serif;
  }
  
  *, *:before, *:after {
    box-sizing: inherit;
  }
`;

export default GlobalStyles;
