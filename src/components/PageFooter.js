import React from "react";
import styled from "styled-components";
import { animateScroll } from "react-scroll";
import SVGDrawIcon from "./SVGDrawIcon.js";
import Icon from "./Icon.js";

const FooterContainer = styled.span`
  margin: 5% 25%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 2fr auto;
  justify-items: center;
  align-items: center;
  grid-template-areas: "contactIcon resumeIcon topIcon githubIcon linkedinIcon"
                       "copyright copyright copyright copyright copyright";
`;

const PageFooter = () => (
  <div style={{width: '100%', alignItems: 'center'}}>
    <FooterContainer>
      <a href="mailto:alex@alexieyizhe.me" target="_blank" style={{gridArea: 'contactIcon'}}>
        <SVGDrawIcon size="3vh" color="#80D07F">
          <Icon name="paper_plane" />
        </SVGDrawIcon>
      </a>
      <a href="/resume" style={{gridArea: 'resumeIcon'}}>
        <SVGDrawIcon size="3vh" color="#DE7947">
          <Icon name="file" />
        </SVGDrawIcon>
      </a>
      <span style={{gridArea: 'topIcon'}} onClick={() => animateScroll.scrollToTop()}>
        <SVGDrawIcon size="5vh" color="#000">
          <Icon name="up_arrow" />
        </SVGDrawIcon>
      </span>
      <a href="https://github.com/alexieyizhe" target="_blank" style={{gridArea: 'githubIcon'}}>
        <SVGDrawIcon size="3vh" color="#B29CE7">
          <Icon name="github" />
        </SVGDrawIcon>
      </a>
      <a href="https://www.linkedin.com/in/alexieyizhe/" target="_blank" style={{gridArea: 'linkedinIcon'}}>
        <SVGDrawIcon size="3vh" color="#4092DE">
          <Icon name="linkedin" />
        </SVGDrawIcon>
      </a>
    <p style={{gridArea: 'copyright'}}>
      © alex xie, mmxviii.
    </p>
  </FooterContainer>
</div>
);

export default PageFooter;
