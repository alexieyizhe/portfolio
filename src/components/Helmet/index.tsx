import React, { useMemo } from "react";
import { Helmet as ReactHelmet } from "react-helmet";

import copy from "~assets/copy";

import {
  Favicon16Triangle,
  Favicon32Triangle,
  FaviconICOTriangle,
  Favicon16Circle,
  Favicon32Circle,
  FaviconICOCircle,
  Favicon16Square,
  Favicon32Square,
  FaviconICOSquare,
  AppleTouchIcon,
  SafariPinnedTabIcon,
} from "~assets/favicons";

export interface HelmetProps {
  title?: string;
  description?: string;
}

const Helmet: React.FC<HelmetProps> = ({
  title,
  description = copy.seo.description,
}) => {
  const renderedTitle = useMemo(() => `Alex Xie${title ? ` | ${title}` : ""}`, [
    title,
  ]);
  const renderedIcons = useMemo(() => {
    const prob = Math.random();

    if (prob < 0.3) {
      return {
        size16x16: Favicon16Triangle,
        size32x32: Favicon32Triangle,
        ico: FaviconICOTriangle,
      };
    } else if (prob < 0.7) {
      return {
        size16x16: Favicon16Circle,
        size32x32: Favicon32Circle,
        ico: FaviconICOCircle,
      };
    } else {
      return {
        size16x16: Favicon16Square,
        size32x32: Favicon32Square,
        ico: FaviconICOSquare,
      };
    }
  }, []);

  return (
    <ReactHelmet>
      {/* base stuff */}
      <meta charSet="utf-8" />
      <title>{renderedTitle}</title>
      <meta name="description" content={description} />

      {/* favicon stuff */}
      <link rel="apple-touch-icon" sizes="180x180" href={AppleTouchIcon} />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={renderedIcons.size32x32}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={renderedIcons.size16x16}
      />
      <link rel="shortcut icon" href={renderedIcons.ico} />

      <link rel="mask-icon" href={SafariPinnedTabIcon} color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#00aba9" />

      {/* opengraph stuff */}
      <meta property="og:description" content={description} />
      <meta property="og:title" content={renderedTitle} />
      <meta property="og:type" content="website" />
    </ReactHelmet>
  );
};

export default Helmet;
