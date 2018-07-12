import React from "react";
import styled from "styled-components";
import posed from "react-pose";
import VisibilitySensor from "react-visibility-sensor";
import { css } from 'styled-components';
import { isMobile, isIOS } from 'react-device-detect';
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
    height: auto;
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
  font-family: "Raleway", Arial, serif;
  font-size: 5vw;
  font-weight: bold;
  position: absolute;
  z-index: 6;
  bottom: 0;
  grid-area: title;
  white-space: nowrap;

  ${mediaSize.tablet`
    font-size: 4.5em;
    font-family: "Cabin", "Ubuntu", Arial, serif;
    letter-spacing: ${isIOS ? '-0.05em' : 0};
  `}

  ${mediaSize.phone`
    font-size: 2.5em;
    position: relative;
    margin-bottom: 0.5em;
    top: 0.5em;
  `}
`;

const WorkLogo = styled.img`
  grid-area: pic;
  justify-self: center;
  position: relative;
  z-index: 6;
  top: -10%;
  right: -16%;
  max-width: 30vw;
  max-height: 20vh;

  filter: grayscale(100%);
  opacity: 0;
  transition: all 0.3s ease-in;

  ${props => props.focused ? css`filter: none; opacity: 1;` : null}

  ${mediaSize.tablet`
    max-width: 25vw;
    max-height: 20vh;
  `}

  ${mediaSize.phone`
    bottom: -2em;
    right: ${isIOS ? '-7em' : '-4em'};
    justify-self: end;
    align-self: end;
    max-width: 45vw;
    max-height: 45vw;
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
    padding-bottom: 1em;
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
