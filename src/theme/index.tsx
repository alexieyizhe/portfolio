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
  size: {
    [Size.XSMALL]: 16,
    [Size.SMALL]: 18,
    [Size.MEDIUM]: 26,
    [Size.LARGE]: 32,
    [Size.XLARGE]: 48,
  },
  borderRadius: {
    card: 10,
  },
};

export default {
  ...themeConstants,
};
