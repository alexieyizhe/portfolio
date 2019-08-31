import { createMediaQueryTemplate } from "./mediaQueries";

export enum Size {
  XSMALL = "xsmall",
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
  XLARGE = "xlarge",
}

const themeConstants = {
  color: {
    black: "#252525",
    white: "#fff",
    greyLight: "#eee",
    greyMedium: "#aaa",
    greyDark: "#333",

    purple: "#D299ED",
    green: "#84EEA8",
    blue: "#15D1DD",
    red: "#ED6F6F",
  },
  fontSize: {
    [Size.XSMALL]: 16,
    [Size.SMALL]: 18,
    [Size.MEDIUM]: 26,
    [Size.LARGE]: 30,
    [Size.XLARGE]: 42,
  },
  lineHeight: {
    [Size.XSMALL]: 1.1,
    [Size.SMALL]: 1.1,
    [Size.MEDIUM]: 1.2,
    [Size.LARGE]: 1.3,
    [Size.XLARGE]: 1.3,
  },
  borderRadius: {
    card: 6,
  },
  fontFamily: {
    heading: "sans-serif",
    body: "sans-serif",
  },
};

const deviceBreakpoints = {
  large: 1440,
  medium: 1024,
  tablet: 768,
  largeMobile: 425,
  mobile: 375,
  smallMobile: 320,
};

export default {
  ...themeConstants,
  mediaQueries: createMediaQueryTemplate(deviceBreakpoints),
};
