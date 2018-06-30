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
  grid-template-columns: ${props => props.picRight ? '4fr 2fr' : '2fr 4fr'};
  grid-template-rows: 2fr 3fr;
  grid-template-areas: ${props => props.picRight ? '"title pic" "desc pic"' : '"pic title" "pic desc"'};


  ${mediaSize.tablet`
    &:before {
      border-radius: 8px;
    }
  `}

  ${mediaSize.phone`
    width: 95%;
    height: 60vh;
    border-radius: 8px;

    &:before {
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

  max-width: 100%;
  max-height: 100%;

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
        onMouseLeave={() => this.setState({hovered: false})}
        picRight={this.props.picRight} >
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
