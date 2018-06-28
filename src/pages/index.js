import React from "react";
import styled from "styled-components";
import posed from "react-pose";


import TemplateWrapper from "../components/TemplateWrapper.js";
import SVGDrawIcon from "../components/SVGDrawIcon.js"
import Particles from 'react-particles-js';
import ScrambleText from '../components/ScrambleText.js';
import { mediaSize, greetingOptions, particleConfig } from "../data/configOptions.js";


import IntroPic from "../../mainPagePic.png";
import LogoPic from "../../logo.png";
import ContactIcon from 'react-feather/dist/icons/send';
import ResumeIcon from 'react-feather/dist/icons/file-text';
import GithubIcon from 'react-feather/dist/icons/github';
import LinkedinIcon from 'react-feather/dist/icons/linkedin';

const fadeEnter = {
  enter: {
    opacity: 0
  },
  normal: {
    opacity: 1,
    transition: { duration: 2500 }
  }
}

const Greeting = styled(posed.div(fadeEnter))`
  font-size: 5vh;
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

const BriefBioText = styled(posed.div(fadeEnter))`
  font-size: 3vh;
  font-family: "PT Serif";
  color: #4B4B4B;
  margin-top: 1vh;
`;

const ImportantInfo = styled(posed.div(fadeEnter))`
  position: absolute;
  bottom: 10%;
  left: 0;

  ${mediaSize.tablet`
    position: relative;
    bottom: 0;
    margin-top: 2vh;
  `}

  ${mediaSize.phone`
    position: relative;
    bottom: 0;
    margin-top: 2vh;
  `}

  & a {
    color: inherit
  }

`;

const MainPagePic = styled(posed.img(fadeEnter))`
  position: absolute;
  bottom: 0;
  right: -10%;
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
    opacity: 1,
    transition: { duration: 500 }
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

          <Greeting initialPose={'enter'} pose={'normal'}>
            {this.state.greeting + " I'm"}
          </Greeting>

          <MainInfoText>
            <ScrambleText text="Alex Xie." options={{ duration: 250, speed: 15 }}/>
          </MainInfoText>

          <BriefBioText initialPose={'enter'} pose={'normal'}>
            <div>code enthusiast.</div>
            <div>event inspirer.</div>
            <div>soccer fanatic.</div>
            <div>lover of bad puns.</div>
          </BriefBioText>

          <ImportantInfo initialPose={'enter'} pose={'normal'} >
            <a href="mailto:alex@alexieyizhe.me" target="_blank">
              <SVGDrawIcon size="3vh" color="#80D07F">
                <svg viewBox="0 0 24 24" fill="none" stroke="#80D07F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
              </SVGDrawIcon>
            </a>
            <a href="/resume">
              <SVGDrawIcon size="3vh" color="#DE7947">
                <svg viewBox="0 0 24 24" fill="none" stroke="#DE7947" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
                </svg>
              </SVGDrawIcon>
            </a>
            <a href="https://github.com/alexieyizhe" target="_blank">
              <SVGDrawIcon size="3vh" color="#B29CE7">
                <svg viewBox="0 0 24 24" fill="none" stroke="#B29CE7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </SVGDrawIcon>
            </a>
            <a href="https://www.linkedin.com/in/alexieyizhe/" target="_blank">
              <SVGDrawIcon size="3vh" color="#4092DE">
                <svg viewBox="0 0 24 24" fill="none" stroke="#4092DE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                  <path d="M2,4a2,2 0 1,0 4,0a2,2 0 1,0 -4,0"/>
                </svg>
              </SVGDrawIcon>
            </a>
            {/*
              TODO: add media query here to move these icons when they don't fit beside the table anymore
            */}
          </ImportantInfo>

          <MainPagePic src={IntroPic} initialPose={'enter'} pose={'normal'} />
          {/* TODO: add transition for image, fade from white? */}

        </TemplateWrapper>
      </div>

    );
  }
}


export default HomePage;

//          <SubLink linkText="say hi!"></SubLink><SubLink linkText="resume"></SubLink><SubLink linkText="github"></SubLink><SubLink linkText="linkedin"></SubLink>
