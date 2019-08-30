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
    [Size.LARGE]: 32,
    [Size.XLARGE]: 48,
  },
  lineHeight: {
    [Size.XSMALL]: 1.2,
    [Size.SMALL]: 1.2,
    [Size.MEDIUM]: 1.4,
    [Size.LARGE]: 1.6,
    [Size.XLARGE]: 1.8,
  },
  borderRadius: {
    card: 10,
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
