import React from "react";
import styled from "styled-components";

import { particleConfig } from "../data/configOptions.js";
import Particles from 'react-particles-js';
import TemplateWrapper from "../components/TemplateWrapper.js";
import { mediaSize } from "../data/configOptions.js";
import { css } from 'styled-components';
import { isMobile } from 'react-device-detect';
import VisibilitySensor from "react-visibility-sensor";


const ParticlesStyle = {
  position: "fixed",
  width: "100%",
  height: "100%",
  zIndex: "-5"
}

const ResumeContainer = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 5em;

  & * {
    display: inline-block;
  }
`;

const ResumeBox = styled.a`
  position: relative;
  width: 50%;

  ${mediaSize.tablet`
    width: 90%;
  `}

  &:before {
    /* Position the pseudo-element. */
    content: ' ';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    /* Create the box shadow at expanded size. */
    box-shadow: 0 10px 50px 0 rgba(0, 0, 0, 0.5);

    /* Hidden by default. */
    opacity: 0;
    transition: opacity 500ms;
  }

  ${props => props.focused ? css`
    &:before {
      opacity: 1;
    }
   ` : null}

  & img {
    max-width: 100%;
  }
`


class ResumePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false
    };
  }

  handleFocus(focused) {
    this.setState({focused: focused});
  }

  render() {
    return (
      <VisibilitySensor onChange={(isVisible) => this.handleFocus(isMobile && isVisible)}>
        <div id="particleBgContainer">
          <Particles params={particleConfig} style={ParticlesStyle} />
          <TemplateWrapper menu footer outerBounds={{ top: '7%', left: '15%', right: '15%', bottom: '0' }} title="Resume" header="resume.">
            <ResumeContainer style={this.props.transition && this.props.transition.style}>
              <ResumeBox
                href='/docs/alex_xie_resume_2A.pdf'
                download="Alex Xie - Resume (2A)"
                focused={this.state.focused}
                onMouseEnter={() => this.handleFocus(true)}
                onMouseLeave={() => this.handleFocus(false)} >
                <img src='/docs/alex_xie_resume_2A.png' />
              </ResumeBox>
            </ResumeContainer>
          </TemplateWrapper>
        </div>
      </VisibilitySensor>
    );
  }
}


export default ResumePage;
