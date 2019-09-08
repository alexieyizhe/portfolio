import React from "react";

import PageWrapper from "~components/PageWrapper";
import copy from "~assets/copy";

import IntroSection from "~sections/design-system/intro";
import PaletteSection from "~sections/design-system/palette";
import TypefaceSection from "~sections/design-system/typeface";
import TextSection from "~sections/design-system/text";
import IconSection from "~sections/design-system/icon";
import LinkAndButtonSection from "~sections/design-system/link-button";
import GallerySection from "~sections/design-system/gallery";
import ParticleSection from "~sections/design-system/particle";
import CardSection from "~sections/design-system/card";

const DesignSystemPage = () => (
  <PageWrapper
    title={copy.designSystemSection.title}
    subtitle={copy.designSystemSection.subtitle}
  >
    <IntroSection />
    <PaletteSection />
    <TypefaceSection />
    <TextSection />
    <IconSection />
    <LinkAndButtonSection />
    <GallerySection />
    <ParticleSection />
    <CardSection />
  </PageWrapper>
);

export default DesignSystemPage;
