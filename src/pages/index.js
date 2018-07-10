import React from "react";
import styled from "styled-components";
import posed from "react-pose";

import TemplateWrapper from "../components/TemplateWrapper.js";
import SVGDrawIcon from "../components/SVGDrawIcon.js"
import Particles from 'react-particles-js';
import ScrambleText from '../components/ScrambleText.js';
import { mediaSize, greetingOptions, particleConfig } from "../data/configOptions.js";
import Icon from "../components/Icon.js";
import Link from "gatsby-link";
import { isMobile, isMobileOnly } from 'react-device-detect';
import IntroPic from "../img/misc/mainPagePic.png";
import LogoPic from "../img/misc/logo.png";

const ParticlesStyle = {
  position: "fixed",
  width: "100%",
  height: "100%",
  zIndex: "-2"
}

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

const MainInfoText = styled(posed.div(fadeEnter))`
  font-family: "PT Sans";
  letter-spacing: 0;
  font-weight: 600;
  line-height: 0.8em;
  font-size: 12vh;

  ${mediaSize.phone`
    letter-spacing: -0.1em;
  `}
`

const BriefBioText = styled(posed.div(fadeEnter))`
  font-size: 3vh;
  font-family: "Average", serif;
  color: #4B4B4B;
  margin-top: 2vh;
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
    color: inherit;
    margin-bottom: 2vh;
    margin-left: 1.5vh;
    margin-right: 1.5vh;
  }

  & a:first-child {
    margin-left: 0;
  }

`;

const MainPagePic = styled(posed.img(fadeEnter))`
  position: absolute;
  bottom: 0;
  right: -10%;
  max-height: 80%;
  max-width: 95%;
  z-index: -1;
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
      iconAnimate: false,
      greeting: greetingOptions[Math.floor(Math.random() * greetingOptions.length)]
    };
  }

  componentDidMount() {
    if(isMobile) {
      this.iconAnimateID = setTimeout(() => {
        this.setState({iconAnimate: true})
      }, 3000);
    }
  }

  componentWillUnmount() {
    if(this.iconAnimateID) {
      clearTimeout(this.iconAnimateID);
    }
  }

  render() {
    return (
      <div id="particleBgContainer" style={this.props.transition && this.props.transition.style}>
        <Particles params={particleConfig} style={ParticlesStyle} />
        <TemplateWrapper defaultMenu curPage="Home" outerBounds={{ top: '7%', left: '15%', right: '15%', bottom: '0' }} title="Alex Xie">
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
            <div>web developer.</div>
            <div>opportunity pursuer.</div>
            <div>soccer fanatic.</div>
            <div>lover of bad puns.</div>
          </BriefBioText>
          <ImportantInfo initialPose={'enter'} pose={'normal'} >
            <a href="mailto:alexieyizhe@gmail.com" target="_blank">
              <SVGDrawIcon animate={this.state.iconAnimate} ignoreHover={isMobile}>
                <Icon name="paper_plane" size={isMobileOnly ? "3vh" : "4vh"} color="#61C260" />
              </SVGDrawIcon>
            </a>
            <Link to="/resume">
              <SVGDrawIcon animate={this.state.iconAnimate} ignoreHover={isMobile}>
                <Icon name="file" size={isMobileOnly ? "3vh" : "4vh"} color="#D26129" />
              </SVGDrawIcon>
            </Link>
            <a href="https://github.com/alexieyizhe" target="_blank">
              <SVGDrawIcon animate={this.state.iconAnimate} ignoreHover={isMobile}>
                <Icon name="github" size={isMobileOnly ? "3vh" : "4vh"} color="#6952A1" />
              </SVGDrawIcon>
            </a>
            <a href="https://www.linkedin.com/in/alexieyizhe/" target="_blank">
              <SVGDrawIcon animate={this.state.iconAnimate} ignoreHover={isMobile}>
                <Icon name="linkedin" size={isMobileOnly ? "3vh" : "4vh"} color="#2381D9" />
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
