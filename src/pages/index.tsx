import React, { useState, useEffect } from "react";

import PageWrapper from "~components/PageWrapper";
import LandingSection from "~sections/landing";

const importFeatured = () =>
  import("../sections/featured").then(component => component.default);
const importAbout = () =>
  import("../sections/about").then(component => component.default);
const importShowcase = () =>
  import("../sections/showcase").then(component => component.default);
const importFooter = () =>
  import("../components/Footer").then(component => component.default);

const IndexPage = () => {
  const [FeaturedSection, setFeaturedSection] = useState<React.FC | null>(null);
  const [AboutSection, setAboutSection] = useState<React.FC | null>(null);
  const [ShowcaseSection, setShowcaseSection] = useState<React.FC | null>(null);
  const [FooterSection, setFooterSection] = useState<React.FC | null>(null);

  useEffect(() => {
    const loadComponents = async () => {
      const featuredSection = await importFeatured();
      setFeaturedSection(featuredSection);

      const aboutSection = await importAbout();
      setAboutSection(aboutSection);

      const showcaseSection = await importShowcase();
      setShowcaseSection(showcaseSection);

      const footerSection = await importFooter();
      setFooterSection(footerSection);
    };

    loadComponents();
  }, []);

  return (
    <PageWrapper>
      <LandingSection />
      {FeaturedSection}
      {AboutSection}
      {ShowcaseSection}
      {FooterSection}
    </PageWrapper>
  );
};

export default IndexPage;
