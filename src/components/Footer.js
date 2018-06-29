import React from "react";
import styled from "styled-components";
import { animateScroll } from "react-scroll";
import SVGDrawIcon from "./SVGDrawIcon.js";

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

const Footer = () => (
  <div style={{width: '100%', alignItems: 'center'}}>
    <FooterContainer>
      <a href="mailto:alex@alexieyizhe.me" target="_blank" style={{gridArea: 'contactIcon'}}>
        <SVGDrawIcon size="3vh" color="#80D07F">
          <svg viewBox="0 0 24 24" fill="none" stroke="#80D07F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
          </svg>
        </SVGDrawIcon>
      </a>
      <a href="/resume" style={{gridArea: 'resumeIcon'}}>
        <SVGDrawIcon size="3vh" color="#DE7947">
          <svg viewBox="0 0 24 24" fill="none" stroke="#DE7947" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
          </svg>
        </SVGDrawIcon>
      </a>
      <span style={{gridArea: 'topIcon'}} onClick={() => animateScroll.scrollToTop()}>
        <SVGDrawIcon size="5vh" color="#000">
          <svg viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 11l-5-5-5 5M17 18l-5-5-5 5"/>
          </svg>
        </SVGDrawIcon>
      </span>
      <a href="https://github.com/alexieyizhe" target="_blank" style={{gridArea: 'githubIcon'}}>
        <SVGDrawIcon size="3vh" color="#B29CE7">
          <svg viewBox="0 0 24 24" fill="none" stroke="#B29CE7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
          </svg>
        </SVGDrawIcon>
      </a>
      <a href="https://www.linkedin.com/in/alexieyizhe/" target="_blank" style={{gridArea: 'linkedinIcon'}}>
        <SVGDrawIcon size="3vh" color="#4092DE">
          <svg viewBox="0 0 24 24" fill="none" stroke="#4092DE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
            <path d="M2,4a2,2 0 1,0 4,0a2,2 0 1,0 -4,0"/>
          </svg>
        </SVGDrawIcon>
      </a>
    <p style={{gridArea: 'copyright'}}>
      © alex xie, 2018.
    </p>
  </FooterContainer>
</div>
);

export default Footer;
