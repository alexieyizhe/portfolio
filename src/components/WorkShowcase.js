import React from "react";
import styled from "styled-components";
import posed from "react-pose";
import VisibilitySensor from "react-visibility-sensor";
import { css } from 'styled-components';
import { isMobile } from 'react-device-detect';
import { mediaSize } from "../data/configOptions.js";


const Container = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  width: 75%;
  height: 32vh;
  margin-bottom: 10vh;
  cursor: pointer;
  color: white;

  display: grid;
  padding: 0 5% 0 5%;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 4fr 2fr;
  grid-template-areas: "title pic"
                       "role role";

  background: url(${props => props.bg}) center/cover;
  filter: grayscale(50%);
  transition: all 0.3s ease-in;

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

  &:after {
    content: ' ';
    position: absolute;
    z-index: 5;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
    opacity: 1;
    transition: opacity 500ms;
  }

  ${props => props.focused ? css`
    filter: none;
    background: url(${props => props.bg}) center/cover;

    &:before {
      opacity: 1;
    }

    &:after {
      opacity: 0.5;
    }
    ` : null
  }

  ${mediaSize.tablet`
    width: 80%;

    border-radius: 8px;
    &:before, &:after {
      border-radius: 8px;
    }
  `}

  ${mediaSize.phone`
    width: 80%;
    height: 50vh;
    padding: 0 10% 0 10%;
    margin-bottom: 12vh;

    border-radius: 8px;
    &:before, &:after {
      border-radius: 8px;
    }

    grid-template-columns: 2fr 1fr;
    grid-template-rows: auto auto auto;
    grid-template-areas: "title title"
                         "role role"
                         "pic pic";
  `}

`;

const WorkTitle = styled.span`
  font-family: "Raleway", serif;;
  font-size: 4vw;
  font-weight: bolder;
  position: absolute;
  z-index: 6;
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
  justify-self: center;
  position: relative;
  z-index: 6;
  top: -10%;
  right: -18%;
  max-width: 30vw;
  max-height: 20vh;

  filter: grayscale(100%);
  opacity: 0;
  transition: all 0.3s ease-in;

  ${props => props.focused ? css`filter: none; opacity: 1;` : null}

  ${mediaSize.phone`
    top: 18%;
    right: -30%;
    max-width: 25vh;
    max-height: 20vh;
  `}

`

const WorkRole = styled.div`
  grid-area: role;
  position: relative;
  z-index: 6;
  font-family: "Raleway", serif;;
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
          bg={this.props.work.bgImgSource}
          onMouseEnter={() => this.handleFocus(true)}
          onMouseLeave={() => this.handleFocus(false)} >

          <WorkTitle>{this.props.work.name}</WorkTitle>
          <WorkRole>{this.props.work.role}</WorkRole>
          <WorkLogo src={this.props.work.logoImgSource} focused={this.state.focused} />

        </Container>
      </VisibilitySensor>
    );
  }
}


export default WorkShowcase;
