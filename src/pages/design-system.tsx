import React from "react";

import PageWrapper from "~components/PageWrapper";
import copy from "~assets/copy";

import IntroSection from "~sections/design-system/Intro";
import PaletteSection from "~sections/design-system/Palette";
import TypefaceSection from "~sections/design-system/Typeface";
import TextSection from "~sections/design-system/Text";
import IconSection from "~sections/design-system/Icon";
import LinkAndButtonSection from "~sections/design-system/LinkAndButton";
import ParticleSection from "~sections/design-system/Particle";
import CardSection from "~sections/design-system/Card";

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
    <ParticleSection />
    <CardSection />
  </PageWrapper>
);

export default DesignSystemPage;
