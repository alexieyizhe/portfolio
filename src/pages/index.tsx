import React from "react";

import { withPageWrapper } from "~components/PageWrapper";

import LandingSection from "~sections/landing";
import FeaturedSection from "~sections/featured";
import ShowcaseSection from "~sections/showcase";

const IndexPage = () => (
  <>
    <LandingSection />
    <FeaturedSection />
    <ShowcaseSection />
  </>
);

export default withPageWrapper(IndexPage);
