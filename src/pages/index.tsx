import React from "react";

import { withPageWrapper } from "~components/PageWrapper";

import LandingSection from "~sections/landing";

const IndexPage = () => (
  <>
    <LandingSection />
  </>
);

export default withPageWrapper(IndexPage);
