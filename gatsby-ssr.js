/* eslint-disable react/jsx-filename-extension */

import React from "react";
import { ThemeProvider } from "styled-components";
import { SiteProvider } from "~utils/context";
import theme from "~theme";
import GlobalStyles from "~theme/globalStyles";

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>
    <SiteProvider>
      <>
        {element}
        <GlobalStyles />
      </>
    </SiteProvider>
  </ThemeProvider>
);
