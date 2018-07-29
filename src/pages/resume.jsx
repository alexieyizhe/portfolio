import React from "react";
import styled, { css } from "styled-components";
import Particles from "react-particles-js";
import { isMobile } from "react-device-detect";
import VisibilitySensor from "react-visibility-sensor";
import TemplateWrapper from "../components/TemplateWrapper";
import HighlightText from "../components/HighlightText";
import Icon from "../components/Icon";
import { particleConfig, resumeOptions, mediaSize } from "../data/configOptions";


const ParticlesStyle = {
  position: "fixed",
  width: "100%",
  height: "100%",
  zIndex: "-5"
};

const ResumeContainer = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 5em;
`;

const ResumeBox = styled.a`
  position: relative;
  width: 50%;
  display: inline-block;

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

  ${(props) => props.focused ? css`
    &:before {
      opacity: 1;
    }
   ` : null}

  & img {
    max-width: 100%;
  }
`;

const ResumeSelector = styled.div`
  width: auto;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2em;

  & > span {
    cursor: pointer;
    margin-left: 0.5em;
  }

  & > span:first-child {
    margin-right: 0;
  }
`;



class ResumePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      selectFocused: resumeOptions[resumeOptions.length - 1].name,
      curResume: resumeOptions[resumeOptions.length - 1]
    };
  }

  handleFocus(type, focused) {
    if(type === "resume") {
      this.setState({focused});
    } else if(type === "selection") {
      this.setState({selectFocused: focused});
    }
  }

  render() {
    return (
      <VisibilitySensor onChange={(isVisible) => this.handleFocus(isMobile && isVisible)}>
        <div id="particleBgContainer">
          <Particles params={particleConfig} style={ParticlesStyle} />
          <TemplateWrapper menu footer outerBounds={{ top: "7%", left: "15%", right: "15%", bottom: "0" }} title="Resume" header="resume.">
            <ResumeContainer style={this.props.transition && this.props.transition.style}>
              <ResumeBox
                href={this.state.curResume.downloadSource}
                target="_blank"
                focused={this.state.focused || isMobile}
                onMouseEnter={() => this.handleFocus("resume", true)}
                onMouseLeave={() => this.handleFocus("resume", false)} >
                <img src={this.state.curResume.previewSource} />
              </ResumeBox>
              <ResumeSelector>
                {resumeOptions.map((resume, i) => {
                  const isLatest = i === resumeOptions.length - 1;
                  return (
                    <span key={i}
                      onMouseEnter={() => this.handleFocus("selection", resume.name)}
                      onMouseLeave={() => this.handleFocus("selection", null)}
                      onClick={() => this.setState({curResume: resume})}
                    >
                      <HighlightText
                        color={resume.color}
                        hovered={(this.state.selectFocused === resume.name && !isMobile) || this.state.curResume.name === resume.name}
                      >
                        {resume.name} {isLatest ? <Icon name="star" size="0.6em" color="#000" /> : null}
                      </HighlightText>
                    </span>

                  );
                })}
              </ResumeSelector>
            </ResumeContainer>
          </TemplateWrapper>
        </div>
      </VisibilitySensor>
    );
  }
}


export default ResumePage;
