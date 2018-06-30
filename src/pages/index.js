import React from "react";
import styled from "styled-components";
import posed from "react-pose";


import TemplateWrapper from "../components/TemplateWrapper.js";
import SVGDrawIcon from "../components/SVGDrawIcon.js"
import Particles from 'react-particles-js';
import ScrambleText from '../components/ScrambleText.js';
import { mediaSize, greetingOptions, particleConfig } from "../data/configOptions.js";
import Icon from "../components/Icon.js";

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

const MainInfoText = styled(posed.div(fadeEnter))`
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

  & span:first-child {
    margin-left: 0;
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
      <div id="particleBgContainer">
        <Particles params={particleConfig} style={ParticlesStyle} />
        <TemplateWrapper defaultMenu outerBounds={{ top: '7%', left: '15%', right: '15%', bottom: '0' }}>

          <Logo src={LogoPic} initialPose={'enter'} pose={'normal'} />
          {/* NOTE: script font in logo is BarleyScript */}

          <Greeting initialPose={'enter'} pose={'normal'}>
            {this.state.greeting + " I'm"}
          </Greeting>

          <MainInfoText initialPose={'enter'} pose={'normal'}>
            <ScrambleText text="Alex Xie." options={{ duration: 250, speed: 15 }}/>
          </MainInfoText>
          {/* TODO: add floating animation for text??? */}
          <BriefBioText initialPose={'enter'} pose={'normal'}>
            <div>code enthusiast.</div>
            <div>event inspirer.</div>
            <div>soccer fanatic.</div>
            <div>lover of bad puns.</div>
          </BriefBioText>

          <ImportantInfo initialPose={'enter'} pose={'normal'} >
            <a href="mailto:alex@alexieyizhe.me" target="_blank">
              <SVGDrawIcon size="4vh" color="#80D07F">
                <Icon name="paper_plane" />
              </SVGDrawIcon>
            </a>
            <a href="/resume">
              <SVGDrawIcon size="4vh" color="#DE7947">
                <Icon name="file" />
              </SVGDrawIcon>
            </a>
            <a href="https://github.com/alexieyizhe" target="_blank">
              <SVGDrawIcon size="4vh" color="#B29CE7">
                <Icon name="github" />
              </SVGDrawIcon>
            </a>
            <a href="https://www.linkedin.com/in/alexieyizhe/" target="_blank">
              <SVGDrawIcon size="4vh" color="#4092DE">
                <Icon name="linkedin" />
              </SVGDrawIcon>
            </a>
          </ImportantInfo>

          <MainPagePic src={IntroPic} initialPose={'enter'} pose={'normal'} />

        </TemplateWrapper>
      </div>

    );
  }
}


export default HomePage;
