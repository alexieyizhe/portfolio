import React from "react";
import styled from "styled-components";
import posed from "react-pose";

import { mediaSize } from "../data/configOptions.js";
import easyPic from "../../flipp_logo.png";
import bg from "../../flipp_bg.jpg";

const Container = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  width: 75%;
  height: 30vh;
  margin-bottom: 10vh;
  cursor: pointer;
  color: white;

  display: grid;
  padding: 0 5% 0 5%;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 4fr 2fr;
  grid-template-areas: "title pic"
                       "role role";

  background: linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ), url(${bg});
  filter: grayscale(50%);
  background-size: cover;
  background-position: center;
  transition: all 0.3s ease-in;

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

  &:hover {
    filter: none;

    :before {
      opacity: 1;
    }
  }

  ${mediaSize.tablet`
    width: 80%;
    border-radius: 8px;
    &:before {
      opacity: 1;
      border-radius: 8px;
    }
  `}

  ${mediaSize.phone`
    width: 80%;
    height: 50vh;
    padding: 0 10% 0 10%;
    margin-bottom: 12vh;
    border-radius: 8px;

    grid-template-columns: 2fr 1fr;
    grid-template-rows: auto auto auto;
    grid-template-areas: "title title"
                         "role role"
                         "pic pic";

    &:before {
      opacity: 1;
      border-radius: 8px;
    }
  `}

`;

const WorkTitle = styled.span`
  font-family: "Raleway";
  font-size: 4vw;
  font-weight: bolder;
  position: absolute;
  bottom: 0;
  grid-area: title;

  ${mediaSize.tablet`
    font-size: 5vh;
  `}

  ${mediaSize.phone`
    position: relative;
    bottom: auto;
    top: 0.5em;
    font-size: 5vh;
  `}
`;

const WorkLogo = styled.img`
  grid-area: pic;
  justify-self: right;
  position: relative;
  top: -10%;
  right: -20%;
  max-width: 30vw;
  max-height: 20vh;


  filter: grayscale(100%);
  opacity: 0;
  transition: all 0.3s ease-in;

  &.hovered {
    filter: none;
    opacity: 1;
  }

  ${mediaSize.tablet`
    filter: none;
  `}

  ${mediaSize.phone`
    filter: none;
    top: 25%;
    right: -30%;
    max-width: 30vh;
    max-height: 25vh;
  `}

`

const WorkRole = styled.div`
  font-family: "Raleway";
  grid-area: role;
  font-size: 2vw;

  ${mediaSize.tablet`
    font-size: 3vh;
  `}

  ${mediaSize.phone`
    font-size: 7vmin;
  `}
`;

class WorkShowcase extends React.Component {
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
        onMouseLeave={() => this.setState({hovered: false})} >
        <WorkTitle>{this.props.work.name}</WorkTitle>
        <WorkRole>{this.props.work.role}</WorkRole>
        <WorkLogo
          src={easyPic}
          className={this.state.hovered ? "hovered" : ""}
        />
        {/* TODO: make these cards parallax scrolling! */}
      </Container>
    );
  }
}


export default WorkShowcase;
