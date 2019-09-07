import React from "react";

import { withPageWrapper } from "~components/PageWrapper";

import LandingSection from "~sections/landing";
import FeaturedSection from "~sections/featured";
import AboutSection from "~sections/about";
import ShowcaseSection from "~sections/showcase";
import Footer from "~components/Footer";

const IndexPage = () => (
  <>
    <LandingSection />
    <FeaturedSection />
    <AboutSection />
    <ShowcaseSection />
    <Footer />
  </>
);

export default withPageWrapper(IndexPage);
