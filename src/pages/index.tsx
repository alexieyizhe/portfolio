import React from "react";

import { withPageWrapper } from "~components/PageWrapper";

import LandingSection from "~sections/landing";
import FeaturedSection from "~sections/featured";
import AboutSection from "~sections/about";
import ShowcaseSection from "~sections/showcase";

const IndexPage = () => (
  <>
    <LandingSection />
    <FeaturedSection />
    <AboutSection />
    <ShowcaseSection />
  </>
);

export default withPageWrapper(IndexPage);
