/* eslint-disable react/jsx-filename-extension */

import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "~theme";
import GlobalStyles from "~theme/globalStyles";

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>
    <>
      {element}
      <GlobalStyles />
    </>
  </ThemeProvider>
);
