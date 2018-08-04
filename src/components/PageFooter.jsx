import React from 'react';
import styled from 'styled-components';
import { animateScroll } from 'react-scroll';
import SVGDrawIcon from './SVGDrawIcon';
import Icon from './Icon';
import { mediaSize } from '../data/configOptions';
import Link from 'gatsby-link';

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
  grid-template-areas:
    'contactIcon resumeIcon topIcon githubIcon linkedinIcon'
    'copyright copyright copyright copyright copyright';

  #copyright {
    font-family: 'Cabin', 'PT Sans', sans-serif;
  }

  ${mediaSize.tablet`
   width: 60%;
 `} ${mediaSize.phone`
   width: 90%;
 `};
`;

const PageFooter = () => (
  <FooterContainer>
    <a
      href="mailto:alex@alexieyizhe.me"
      target="_blank"
      style={{ gridArea: 'contactIcon' }}
    >
      <SVGDrawIcon>
        <Icon name="paperPlane" size="2vh" color="#80D07F" />
      </SVGDrawIcon>
    </a>
    <Link to="/resume" style={{ gridArea: 'resumeIcon' }}>
      <SVGDrawIcon>
        <Icon name="file" size="2vh" color="#DE7947" />
      </SVGDrawIcon>
    </Link>
    <span
      id="scrollToTopTrigger"
      style={{ gridArea: 'topIcon' }}
      onClick={() => animateScroll.scrollToTop()}
    >
      <SVGDrawIcon>
        <Icon name="upArrow" size="4vh" color="#000" />
      </SVGDrawIcon>
    </span>
    <a
      href="https://github.com/alexieyizhe"
      target="_blank"
      style={{ gridArea: 'githubIcon' }}
    >
      <SVGDrawIcon>
        <Icon name="github" size="2vh" color="#5534AC" />
      </SVGDrawIcon>
    </a>
    <a
      href="https://www.linkedin.com/in/alexieyizhe/"
      target="_blank"
      style={{ gridArea: 'linkedinIcon' }}
    >
      <SVGDrawIcon>
        <Icon name="linkedin" size="2vh" color="#2381D9" />
      </SVGDrawIcon>
    </a>
    <p style={{ gridArea: 'copyright' }} id="copyright">
      © alex xie, mmxviii.
    </p>
  </FooterContainer>
);

export default PageFooter;
