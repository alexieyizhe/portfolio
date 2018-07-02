import React from "react";
import styled from "styled-components";
import posed from "react-pose";
import VisibilitySensor from "react-visibility-sensor";
import { css } from 'styled-components';
import { isMobile } from 'react-device-detect';
import { mediaSize } from "../data/configOptions.js";

import SVGDrawIcon from "./SVGDrawIcon.js";
import Icon from "./Icon.js";

import '../data/devicons.min.css';

const ContainerConfig = {
  enter: {
    opacity: 0
  },
  normal: {
    opacity: 1
  },
  hovered: {
    opacity: 1
  }
}

const Container = styled(posed.div(ContainerConfig))`
  position: relative;
  height: 25em;
  padding: 10%;
  display: grid;
  grid-template-columns: 250px;
  grid-template-rows: 10em 3em 5em 4em 2em;
  grid-template-areas: "pic" "title" "desc" "stack" "links";


  /* Pseudo-element for shadow on container during focus */
  &:before {
    content: ' ';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    box-shadow: 0 10px 50px 0 rgba(0, 0, 0, 0.5);

    opacity: 0;
    transition: opacity 500ms;
  }

  ${props => props.focused ? css`
    &:before {
      opacity: 1;
    }
    ` : null
  }

  ${mediaSize.tablet`
  `}

  ${mediaSize.phone`
  `}
`;

const ProjectPic = styled.img`
  /* Positioning */
  grid-area: pic;
  justify-self: center;
  align-self: center;

  /* Sizing */
  max-width: 95%;
  max-height: 95%;

  /* Design */
  transition: 1s filter;
  ${props => props.focused ? css`filter: none;` : css`filter: grayscale(90%);`}

  ${mediaSize.tablet`
  `}

  ${mediaSize.phone`
  `}
`

const ProjectTitle = styled.span`
  /* Positioning */
  grid-area: title;
  justify-self: start;
  align-self: center;

  /* Design */
  font-family: "PT Sans";
  font-weight: bold;
  font-size: 2em;

  ${mediaSize.tablet`
  `}

  ${mediaSize.phone`
  `}
`;


const ProjectDesc = styled.div`
  grid-area: desc;
  justify-self: start;
  align-self: center;

  ${mediaSize.tablet`
  `}

  ${mediaSize.phone`
  `}
`;

const ProjectStack = styled.div`
  grid-area: stack;
  justify-self: start;
  align-self: center;

  ${mediaSize.tablet`
  `}

  ${mediaSize.phone`
  `}
`;
const ProjectLinks = styled.div`
  grid-area: links;
  justify-self: center;
  align-self: center;

  text-align: center;

  & a {
    padding: 2%;
  }

  ${mediaSize.tablet`
  `}

  ${mediaSize.phone`
  `}
`;

class ProjectShowcase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
    };
  }

  handleFocus(focused) {
    this.setState({focused: focused});
  }

  render() {
    return (
      <VisibilitySensor onChange={(isVisible) => this.handleFocus(isMobile && isVisible)}>
        <Container
          focused={this.state.focused}
          initialPose='enter' pose={this.state.focused ? 'hovered' : 'normal'}
          onMouseEnter={() => this.handleFocus(true)}
          onMouseLeave={() => this.handleFocus(false)}
          color={this.props.color}
        >

          <ProjectPic src={this.props.project.imgSource} focused={this.state.focused} />
          <ProjectTitle>{this.props.project.name}</ProjectTitle>
          <ProjectDesc>{this.props.project.desc}</ProjectDesc>
          <ProjectStack>
            {this.props.project.techStack.map((tech, i) => {
              return (
                <a href={`http://www.google.com/search?q=${tech}`} key={i} target="_blank">
                  <span class="devicons devicons-bing_small" />
                </a>
              );
            })}
          </ProjectStack>
          <ProjectLinks>
            <a href={`http://www.google.com`} target="_blank">
              View
            </a>
            <a href={`http://www.github.com`} target="_blank">
              Github
            </a>
          </ProjectLinks>

        </Container>
      </VisibilitySensor>
    );
  }
}


export default ProjectShowcase;
