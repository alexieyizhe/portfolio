import React from "react";
import styled from "styled-components";
import { animateScroll } from "react-scroll";
import SVGDrawIcon from "./SVGDrawIcon.js";
import Icon from "./Icon.js";
import { mediaSize } from "../data/configOptions.js";

const FooterContainer = styled.span`
  margin: 10% 5vw;
  width: 30%;
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1.5fr 1fr 1fr;
  grid-template-rows: 2fr auto;
  justify-items: center;
  align-items: center;
  grid-template-areas: "contactIcon resumeIcon topIcon githubIcon linkedinIcon"
                       "copyright copyright copyright copyright copyright";


 ${mediaSize.tablet`
   width: 60%;
 `}

 ${mediaSize.phone`
   width: 90%;
 `}
`;

const PageFooter = () => (
    <FooterContainer>
      <a href="mailto:alex@alexieyizhe.me" target="_blank" style={{gridArea: 'contactIcon'}}>
        <SVGDrawIcon size="2vh" color="#80D07F">
          <Icon name="paper_plane" />
        </SVGDrawIcon>
      </a>
      <a href="/resume" style={{gridArea: 'resumeIcon'}}>
        <SVGDrawIcon size="2vh" color="#DE7947">
          <Icon name="file" />
        </SVGDrawIcon>
      </a>
      <span style={{gridArea: 'topIcon'}} onClick={() => animateScroll.scrollToTop()}>
        <SVGDrawIcon size="4vh" color="#000">
          <Icon name="up_arrow" />
        </SVGDrawIcon>
      </span>
      <a href="https://github.com/alexieyizhe" target="_blank" style={{gridArea: 'githubIcon'}}>
        <SVGDrawIcon size="2vh" color="#B29CE7">
          <Icon name="github" />
        </SVGDrawIcon>
      </a>
      <a href="https://www.linkedin.com/in/alexieyizhe/" target="_blank" style={{gridArea: 'linkedinIcon'}}>
        <SVGDrawIcon size="2vh" color="#4092DE">
          <Icon name="linkedin" />
        </SVGDrawIcon>
      </a>
    <p style={{gridArea: 'copyright'}}>
      © alex xie, mmxviii.
    </p>
  </FooterContainer>
);

export default PageFooter;
