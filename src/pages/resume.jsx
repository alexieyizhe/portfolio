import React from 'react';
import styled from 'styled-components';
import Particles from 'react-particles-js';
import { isMobile } from 'react-device-detect';
import VisibilitySensor from 'react-visibility-sensor';
import TemplateWrapper from '../components/TemplateWrapper';
import HighlightText from '../components/HighlightText';
import ResumeBox from '../components/ResumeBox';

import Icon from '../components/Icon';
import { particleConfig, resumeOptions } from '../data/configOptions';

const ParticlesStyle = {
  position: 'fixed',
  width: '100%',
  height: '100%',
  zIndex: '-5'
};

const ResumeContainer = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 5em;
`;

const ResumeSelector = styled.div`
  width: auto;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2em;

  & > div {
    cursor: pointer;
    margin: 0.5em 0 0 1em;
    display: inline-block;
  }

  & > div:first-child {
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
    if (type === 'resume') {
      this.setState({ focused });
    } else if (type === 'selection') {
      this.setState({ selectFocused: focused });
    }
  }

  render() {
    return (
      <VisibilitySensor
        onChange={isVisible => this.handleFocus(isMobile && isVisible)}
      >
        <div id="particleBgContainer">
          <Particles params={particleConfig} style={ParticlesStyle} />
          <TemplateWrapper
            menu
            footer
            outerBounds={{ top: '7%', left: '15%', right: '15%', bottom: '0' }}
            title="Resume"
            header="resume."
          >
            <ResumeContainer
              style={this.props.transition && this.props.transition.style}
            >
              <ResumeBox
                downloadSource={this.state.curResume.downloadSource}
                previewSource={this.state.curResume.previewSource}
                focused={this.state.focused || isMobile}
                handleFocus={() => this.handleFocus}
              />
              <ResumeSelector>
                {resumeOptions.map((resume, i) => {
                  const isLatest = i === resumeOptions.length - 1;
                  return (
                    <div
                      key={resume.name}
                      onMouseEnter={() =>
                        this.handleFocus('selection', resume.name)
                      }
                      onMouseLeave={() => this.handleFocus('selection', null)}
                      onClick={() => this.setState({ curResume: resume })}
                    >
                      <HighlightText
                        color={resume.color}
                        hovered={
                          (this.state.selectFocused === resume.name &&
                            !isMobile) ||
                          this.state.curResume.name === resume.name
                        }
                      >
                        {resume.name}{' '}
                        {isLatest ? (
                          <Icon name="star" size="0.6em" color="#000" />
                        ) : null}
                      </HighlightText>
                    </div>
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
