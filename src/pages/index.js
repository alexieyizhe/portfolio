import React from "react";
import styled from "styled-components";
import posed from "react-pose";

import TemplateWrapper from "../components/TemplateWrapper.js";
import SVGDrawIcon from "../components/SVGDrawIcon.js"
import { greetingOptions, particleConfig } from "../data/configOptions.js";
import Particles from 'react-particles-js';

import IntroPic from "../../mainPagePic.png";
import LogoPic from "../../logo.png";
import ContactIcon from 'react-feather/dist/icons/send';
import ResumeIcon from 'react-feather/dist/icons/file-text';
import GithubIcon from 'react-feather/dist/icons/github';
import LinkedinIcon from 'react-feather/dist/icons/linkedin';


const Greeting = styled.div`
  font-size: 6vh;
  margin-top: 16%;
`;

const ParticlesStyle = {
  position: "fixed",
  width: "100%",
  height: "100%",
  zIndex: "-2"
}
const MainInfoContainer = styled.div`
  position: relative;
  left: -3vmax;
  margin-bottom: 1em;

  display: grid;
  grid-template-columns: 2vmax auto;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-column-gap: 1vmax;
  grid-template-areas: "contactIcon mainInfoText"
                       "resumeIcon mainInfoText"
                       "githubIcon mainInfoText"
                       "linkedinIcon mainInfoText";
`;

const MainInfoText = styled.div`
  display: grid;
  grid-area: mainInfoText;
  line-height: 0.8em;
  font-size: 12vh;
`

const MainInfoIcon = styled.div`
  display: grid;
  grid-area: ${props => props.gridid};
  justify-content: center;
  align-items: center;

  transform: rotate(-90deg);
  opacity: 0.4;
  transition: transform 0.5s, opacity 0.5s;

  &:hover {
    opacity: 1;
    transform: rotate(0deg);
    cursor: pointer;
  }
`

const BriefBioText = styled.div`
  font-size: 3vh;
  font-family: "PT Serif";
  color: #4B4B4B;
  margin-top: 1vh;
`;

const ImportantInfo = styled.div`
  position: absolute;
  bottom: 10%;
  left: 0;

  & > * {
    margin-right: 0.5vh;
  }
`;

const MainPagePic = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
  max-height: 80%;
  max-width: 95%;
  z-index: -1
`;

const Logo = posed.img({
  enter: {
    x: -200,
    opacity: 0,
  },
  normal: {
    x: 0,
    opacity: 1
  }
})

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverInfo: null,
      curInfo: 'name',
      greeting: greetingOptions[Math.floor(Math.random() * greetingOptions.length)]
    };
  }

  render() {
    return (
      <div id="background">
        <Particles params={particleConfig} style={ParticlesStyle} />
        <TemplateWrapper menu outerBounds={{ top: '7%', left: '15%', right: '15%', bottom: '0' }}>

          <Logo src={LogoPic} initialPose={'enter'} pose={'normal'} />
          {/* script font in logo is BarleyScript */}

          <Greeting>
            {this.state.greeting + " I'm"}
          </Greeting>

          <MainInfoText>
            Alex Xie.
          </MainInfoText>

          <BriefBioText>
            <div>code enthusiast.</div>
            <div>event inspirer.</div>
            <div>soccer fanatic.</div>
            <div>lover of bad puns.</div>
          </BriefBioText>

          <ImportantInfo>
            <a href="mailto:alex@alexieyizhe.me" target="_blank" style={{color: 'inherit'}}>
              <SVGDrawIcon>
                <svg width="4vh" height="4vh" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
              </SVGDrawIcon>
            </a>
            <a href="resume" target="_blank" style={{color: 'inherit'}}>
              <SVGDrawIcon>
                <svg width="4vh" height="4vh" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
                </svg>
              </SVGDrawIcon>
            </a>
            <a href="https://github.com/alexieyizhe" target="_blank" style={{color: 'inherit'}}>
              <SVGDrawIcon>
                <GithubIcon size={'4vh'} />
              </SVGDrawIcon>
            </a>
            <a href="https://www.linkedin.com/in/alexieyizhe/" target="_blank" style={{color: 'inherit'}}>
              <SVGDrawIcon>
                <svg width="4vh" height="4vh" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
              </SVGDrawIcon>
            </a>
            {/*
              TODO: add media query here to move these icons when they don't fit beside the table anymore
              TODO: implement svg line drawing when hovering!! make less opaque when not hovered, draw outline of icon when hovered
            */}
          </ImportantInfo>

          <MainPagePic src={IntroPic} />
          {/* TODO: add transition for image, fade from white? */}

        </TemplateWrapper>
      </div>

    );
  }
}


export default HomePage;

//          <SubLink linkText="say hi!"></SubLink><SubLink linkText="resume"></SubLink><SubLink linkText="github"></SubLink><SubLink linkText="linkedin"></SubLink>
