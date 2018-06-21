import React from "react";
import styled from "styled-components";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import Footer from "./Footer.js";
import DropMenu from "./DropMenu.js";

// Global styles go here!
const TemplateContainer = styled.div`
  font-family: "SF UI Display";
`;

const TemplateWrapper = ({ children }) => (
  <TemplateContainer>
    <Helmet
      title="Portfolio Site of Alex Yizhe Xie"
      meta={[
        { name: `description`, content: `The personal website/portfolio of Alex Xie, a computer science student at the University of Waterloo.` },
        { name: `keywords`, content: `Alex, Yizhe, Xie, alexieyizhe, website, portfolio, university, waterloo, projects, work, experience, resume, contact` },
      ]}
    />
    <div>
      {children}
    </div>
    <DropMenu />
    <Footer />
  </TemplateContainer>
);

export default TemplateWrapper;
