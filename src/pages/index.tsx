import React from "react";
import loadable from "@loadable/component";

import PageWrapper from "~components/PageWrapper";
import LandingSection from "~sections/landing";

const Featured = loadable(() => import("~sections/featured"));
const About = loadable(() => import("~sections/about"));
const Showcase = loadable(() => import("~sections/showcase"));
const Footer = loadable(() => import("~components/Footer"));

const IndexPage = () => (
  <PageWrapper>
    <LandingSection />
    <Featured />
    <About />
    <Showcase />
    <Footer />
  </PageWrapper>
);
export default IndexPage;
