import { createMediaQueryTemplate } from "./mediaQueries";
import { deviceBreakpoints } from "./breakpoints";
import { themeConstants } from "./constants";

export default {
  ...themeConstants,
  mediaQueries: createMediaQueryTemplate(deviceBreakpoints),
};
