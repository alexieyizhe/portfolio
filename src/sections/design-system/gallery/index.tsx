import React from "react";

import copy from "~assets/copy";

import ElementGroup from "~sections/design-system/components/ElementGroup";
import Gallery from "~components/Gallery";

import { AboutAvatar, HeroMe } from "~assets/images";

const GallerySection = () => (
  <ElementGroup
    title={copy.designSystemSection.sections.gallery.title}
    desc={copy.designSystemSection.sections.gallery.desc}
  >
    <Gallery images={[AboutAvatar, HeroMe]} />
  </ElementGroup>
);

export default GallerySection;
