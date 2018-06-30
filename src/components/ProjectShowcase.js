import React from "react";
import styled from "styled-components";
import posed from "react-pose";

import { mediaSize } from "../data/configOptions.js";
import easyPic from "../../easy.png";

const Container = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  height: 25vh;
  margin-bottom: 5vh;
  cursor: pointer;

  display: grid;
  grid-template-columns: 6fr 2fr;
  grid-template-rows: 2fr 3fr;
  grid-template-areas: "title pic"
                       "desc pic";


  & p {
    position: absolute;
    bottom: 30px;
    left: 30px;
    right: 100px;
    margin: 0;
  }

  /* TODO: add props to showing or hiding the shadow so that touch-only devices can have it always show by default */
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

/*
  &:hover:before {
    opacity: 1;

  }*/

  ${mediaSize.tablet`
    &:before {
      //opacity: 1;
      border-radius: 8px;
    }
  `}

  ${mediaSize.phone`
    width: 95%;
    height: 60vh;
    border-radius: 8px;

    &:before {
      //opacity: 1;
      border-radius: 8px;
    }
  `}

`;

const ProjectTitle = styled.span`
  font-family: "Raleway";
  font-size: 3em;
  font-weight: bolder;
  position: relative;
  grid-area: title;
`;

const TitleBgConfig = {
  closed: {
    width: 0,
  },
  hovered: {
    width: ({length}) => length * 25
  },
};

const TitleBg = styled(posed.div(TitleBgConfig))`
  background-color: ${props => props.colour};
  opacity: 0.2;
  position: relative;
  top: -0.7em;
  margin-left: 0.5em;
  height: 0.9em;
  z-index: 1;
`;

const ProjectPic = styled.img`
  grid-area: pic;
  justify-self: center;
  align-self: center;

  max-width: 30vh;
  max-height: 25vh;

  filter: grayscale(100%);
  transition: 1s filter;

  &.hovered {
    filter: none;
  }

`

const ProjectDesc = styled.div`
  grid-area: desc;
`;

class ProjectShowcase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false,
    };
  }

  render() {
    const isMobile = "ontouchstart" in document.documentElement;
    return (
      <Container
        onMouseEnter={() => this.setState({hovered: true})}
        onMouseLeave={() => this.setState({hovered: false})}>
        <ProjectTitle>
          <div style={{zIndex: 3, position: 'relative'}}>{this.props.project.name}</div>
          <TitleBg
            initialPose = 'closed'
            pose={this.state.hovered ? 'hovered' : 'closed'}
            colour={"#536DE9"}
            length={this.props.project.name.length} />
        </ProjectTitle>
        <ProjectDesc>
          Parturient montes nascetur ridiculus mus. Sit amet purus gravida quis. Volutpat sed cras ornare arcu. Est velit egestas dui id.
        </ProjectDesc>
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
