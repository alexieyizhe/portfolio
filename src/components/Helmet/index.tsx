import React from "react";
import { Helmet as ReactHelmet } from "react-helmet";

import copy from "~assets/copy";

import {
  Favicon16Triangle,
  Favicon32Triangle,
  FaviconICOTriangle,
  Favicon16Circle,
  Favicon32Circle,
  FaviconICOCircle,
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
  const renderedTitle = `Alex Xie${title ? ` | ${title}` : ""}`;

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
        href={Math.random() < 0.5 ? Favicon32Triangle : Favicon32Circle}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={Math.random() < 0.5 ? Favicon16Triangle : Favicon16Circle}
      />
      <link
        rel="shortcut icon"
        href={Math.random() < 0.5 ? FaviconICOTriangle : FaviconICOCircle}
      />
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
