import React from "react";
import styled from "styled-components";

import PageWrapper from "~components/PageWrapper";
import copy from "~assets/copy.json";

import IntroSection from "./sections/Intro";
import PaletteSection from "./sections/Palette";
import TypefaceSection from "./sections/Typeface";
import TextSection from "./sections/Text";
import CardSection from "./sections/Card";

const DesignSystemPage = () => (
  <PageWrapper
    title={copy.designSystemSection.title}
    subtitle={copy.designSystemSection.subtitle}
  >
    <IntroSection />
    <PaletteSection />
    <TypefaceSection />
    <TextSection />
    <CardSection />
  </PageWrapper>
);

export default DesignSystemPage;