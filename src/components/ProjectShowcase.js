import React from "react";
import styled from "styled-components";
import posed from "react-pose";
import VisibilitySensor from "react-visibility-sensor";
import { css } from 'styled-components';
import { isMobile } from 'react-device-detect';
import { mediaSize } from "../data/configOptions.js";

import SVGDrawIcon from "./SVGDrawIcon.js";
import Icon from "./Icon.js";

import easyPic from "../../easy.png";


const ContainerConfig = {
  enter: {
    opacity: 0
  },
  normal: {
    opacity: 1,
    zoom: 0.9
  },
  hovered: {
    opacity: 1,
    zoom: 1
  }
}

const Container = styled(posed.div(ContainerConfig))`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  width: 75%;
  height: 30vh;
  padding: 0 5% 0 5%;
  margin-bottom: 10vh;
  cursor: pointer;
  border: 3px dotted rgba(0, 0, 0, 0.1);
  transform: translateZ(0);

  display: grid;
  grid-template-columns: ${props => props.picright ? '6fr 5fr' : '5fr 6fr'};
  grid-template-rows: 2fr 1fr 1.5fr;
  grid-column-gap: 2vmax;
  grid-template-areas: ${props => props.picright ? '"title pic" "desc pic" "stack pic"' : '"pic title" "pic desc"  "pic stack"'};

  ${mediaSize.tablet`
    width: 80%;
    grid-template-columns: 5% 95%;
    grid-column-gap: 0;
    grid-row-gap: 2vh;
    grid-template-rows: 5fr 2fr 2fr;
    grid-template-areas: "title pic"
                         "desc desc"
                         "stack stack";
    padding: 3vh 5% 0 5%;
  `}

  ${mediaSize.phone`
    width: 87%;
    height: 50vh;
    grid-template-columns: 90%;
    grid-template-rows: 30vh 5vh 10vh 5vh;
    grid-row-gap: 0;
    grid-template-areas: "pic"
                         "title"
                         "desc"
                         "stack";
    padding: 0 5% 0 5%;
    border: none;
  `}

`;

const ProjectTitle = styled.span`
  font-family: "PT Serif";
  font-size: 4vw;
  grid-area: title;
  align-self: center;
  margin-bottom: 0.25em;

  ${mediaSize.tablet`
    align-self: left;
    font-size: 4vh;
    white-space: nowrap;
  `}

  ${mediaSize.phone`
    font-size: 4.5vh;
    white-space: default;
  `}
`;

const Highlight = styled.span`
  position: relative;
  z-index: 1;

  &:before { /* background of title on hover */
    background-color: ${props => props.colour};
    opacity: 0.3;
    content: ' ';
    position: absolute;
    top: 0.45em;
    left: 0.25em;
    height: 0.9em;
    right: 0;
    bottom: 0;
    width: 0;
    z-index: -1;

    transition: 250ms ease width;

    ${props => props.hovered ? css`width: 95%;` : null}
  }
`

const ProjectPic = styled.img`
  grid-area: pic;
  justify-self: center;
  align-self: center;

  width: 100%;
  max-height: 100%;

  filter: grayscale(100%);
  transition: 1s filter;

  &.hovered {
    filter: none;
  }

  ${mediaSize.tablet`
    justify-self: end;

    width: auto;
    max-width: 100%;
  `}

  ${mediaSize.phone`
    align-self: end;
    margin-bottom: 1em;
    width: auto;
    max-width: 100%;
  `}
`

const ProjectDesc = styled.span`
  grid-area: desc;
  font-family: "Raleway";

  font-size: 2.2vmin;
  padding: 0;
  margin: 0;

  ${mediaSize.tablet`
    justify-self: center;
    align-self: center;
    font-size: 2vmax;
  `}

  ${mediaSize.phone`
  `}
`;

const ProjectTechUsed = styled.div`
  grid-area: stack;
  align-self: center;
  & a {
    margin-right: 1vh;
  }
`;

class ProjectShowcase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false,
    };
  }



  render() {
    return (
      <Container
        initialPose='enter' pose={this.state.hovered ? 'hovered' : 'normal'}
        onMouseEnter={() => this.setState({hovered: true})}
        onMouseLeave={() => this.setState({hovered: false})}
        picright={this.props.layout === 'right'} >
        <ProjectTitle>
          <Highlight colour={this.props.project.color} hovered={this.state.hovered}>{this.props.project.name}</Highlight>
        </ProjectTitle>
        <ProjectDesc>{this.props.project.desc}</ProjectDesc>
        <ProjectTechUsed>
          <a href="mailto:alex@alexieyizhe.me" target="_blank">
            <SVGDrawIcon ignoreHover animate={this.state.hovered}>
              <Icon name="paper_plane" size="3vmin" color="#80D07F" />
            </SVGDrawIcon>
          </a>
          <a href="/resume" style={{gridArea: 'resumeIcon'}}>
            <SVGDrawIcon ignoreHover animate={this.state.hovered}>
              <Icon name="file" size="3vmin" color="#DE7947" />
            </SVGDrawIcon>
          </a>
          <a href="https://github.com/alexieyizhe" target="_blank">
            <SVGDrawIcon ignoreHover animate={this.state.hovered}>
              <Icon name="github" size="3vmin" color="#B29CE7" />
            </SVGDrawIcon>
          </a>
          <a href="https://www.linkedin.com/in/alexieyizhe/" target="_blank">
            <SVGDrawIcon ignoreHover animate={this.state.hovered}>
              <Icon name="javascript" size="3vmin" color="#4092DE"/>
            </SVGDrawIcon>
          </a>
        </ProjectTechUsed>
        <ProjectPic
          src={easyPic}
          className={this.state.hovered ? "hovered" : ""}
        />
        {/* TODO: make these cards parallax scrolling! */}
      </Container>
    );
  }
}


export default ProjectShowcase;
