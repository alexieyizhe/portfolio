import { Size } from "~types/Size";

export const themeConstants = {
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
    [Size.MEDIUM]: 22,
    [Size.LARGE]: 26,
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
  boxShadow: {
    main: "0 2px 10px 0 rgba(0, 0, 0, 8%)",
  },
};
