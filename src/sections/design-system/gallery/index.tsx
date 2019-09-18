import React from "react";

import copy from "~assets/copy";

import ElementGroup from "~sections/design-system/components/ElementGroup";
import Gallery from "~components/Gallery";

import { HeroMe, AboutMainImg } from "~assets/images";

const GallerySection = () => (
  <ElementGroup
    title={copy.designSystemSection.sections.gallery.title}
    desc={copy.designSystemSection.sections.gallery.desc}
  >
    <Gallery images={[AboutMainImg, HeroMe]} />
  </ElementGroup>
);

export default GallerySection;
