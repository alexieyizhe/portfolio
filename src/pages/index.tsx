import React from "react";

import PageWrapper from "~components/PageWrapper";

import LandingSection from "~sections/landing";
import FeaturedSection from "~sections/featured";
import AboutSection from "~sections/about";
import ShowcaseSection from "~sections/showcase";
import Footer from "~components/Footer";

const IndexPage = () => (
  <PageWrapper>
    <LandingSection />
    <FeaturedSection />
    <AboutSection />
    <ShowcaseSection />
    <Footer />
  </PageWrapper>
);

export default IndexPage;
