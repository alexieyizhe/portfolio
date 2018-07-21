import React from "react";
import styled from "styled-components";
import VisibilitySensor from "react-visibility-sensor";
import { css } from "styled-components";
import { isMobile, isIOS } from "react-device-detect";
import { mediaSize } from "../data/configOptions.js";

import Icon from "./Icon.js";
import FloatText from "./FloatText.js";


const Container = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  width: ${(props) => props.expanded ? "90%" : "75%"};
  height: auto;
  margin-bottom: 10vh;
  cursor: pointer;
  color: #F6F6F6;
  border-radius: 5px;

  display: grid;
  padding: 0 5% 0 5%;
  grid-template-rows: auto;
  grid-template-areas: "title"
                       "role"
                       "desc"
                       "indicator";

  background: url(${(props) => props.bg}) center/cover;
  filter: grayscale(50%);
  transition: all 0.2s ease-in;
  transition: width 0.75s ease, height 0.75s ease;

  /* Pseudo-element for shadow on container during focus */
  &:before {
    content: ' ';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    box-shadow: 0 10px 50px 0 rgba(0, 0, 0, 0.6);
    border-radius: 5px;

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
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.6);
    opacity: 1;
    transition: opacity 500ms;
  }

  ${(props) => props.focused || props.expanded ? css`
    filter: none;
    background: url(${props => props.bg}) center/cover;

    &:before {
      opacity: 1;
    }

    &:after {
      opacity: 0.75;
    }

    ${mediaSize.phone`
      &:after {
        opacity: 0.85;
      }
    `}
    ` : null
  }

  ${mediaSize.tablet`
    width: 85%;
    border-radius: 8px;
    &:before, &:after {
      border-radius: 8px;
    }
  `}

  ${mediaSize.phone`
    height: auto;
    width: 80%;
    padding: 0 10% 0 10%;
    margin-bottom: 4em;

    grid-template-rows: auto auto auto;
    grid-template-areas: "title"
                         "role"
                         "desc"
                         "indicator";
  `}

`;

const WorkTitle = styled.span`
  font-family: "Raleway", Arial, serif;
  font-size: 5vw;
  font-weight: bold;
  position: relative;
  z-index: 6;
  bottom: 0;
  grid-area: title;
  white-space: nowrap;
  padding-top: 1em;
  padding-bottom: 2px;

  ${mediaSize.tablet`
    padding-top: 15vmin;
    font-size: 4.5em;
    font-family: "Cabin", "Ubuntu", Arial, serif;
    letter-spacing: ${isIOS ? '-0.05em' : 0};
  `}

  ${mediaSize.phone`
    font-size: 2.5em;
    position: relative;
    padding-top: 40vw;
  `}
`;

const WorkLogo = styled.img`
  position: absolute;
  z-index: 6;
  top: -5vh;
  right: -5vw;
  max-width: 40vw;
  max-height: 25vh;

  opacity: 0;
  transition: all 0.3s ease-in;

  ${(props) => props.focused || props.expanded ? css`opacity: 1;` : null}

  ${mediaSize.tablet`
    top: -5vw;
    max-width: 30vmin;
    max-height: 25vmin;
  `}

  ${mediaSize.phone`
    top: -5vw;
    right: -8vw;
    max-width: 43vw;
    max-height: 60vw;
  `}
`;

const WorkRole = styled.div`
  grid-area: role;
  position: relative;
  z-index: 6;
  font-family: "Raleway", serif;;
  font-size: 2vw;
  padding-bottom: 1.5em;

  ${mediaSize.tablet`
    font-size: 2em;
    padding-bottom: 1.5em;
  `}

  ${mediaSize.phone`
    font-size: 5vw;
  `}
`;

const WorkDesc = styled.div`
  grid-area: desc;
  align-self: start;
  padding-bottom: ${(props) => props.expanded ? "2em" : 0};
  line-height: 1.5;
  font-size: 2.5vmin;
  z-index: 6;
  font-family: 'Average', 'PT Serif', serif;
  max-width: 100%;
  max-height: ${(props) => props.expanded ? "7em" : 0};
  opacity: ${(props) => props.expanded ? 1 : 0};
  transition: max-height 1s, opacity 0.7s, padding 1s;

  ${mediaSize.tablet`
    max-height: ${(props) => props.expanded ? "20em" : 0};
    padding-bottom: ${(props) => props.expanded ? "3vw" : 0};
  `}

  ${mediaSize.phone`
    font-size: 1em;
    max-height: ${(props) => props.expanded ? "30em" : 0};
    padding-bottom: ${(props) => props.expanded ? "7vw" : 0};
  `}
`

const DropdownArrow = styled.span`
  grid-area: indicator;
  z-index: 6;
  align-self: center;
  justify-self: center;
  margin-bottom: 1vw;
`;

class WorkShowcase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      expanded: false,
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
          expanded={this.state.expanded}
          bg={this.props.work.bgImgSource}
          onMouseEnter={() => this.handleFocus(true)}
          onMouseLeave={() => this.handleFocus(false)}
          onClick={() => this.setState((prevState) => {return {expanded: !prevState.expanded};})}>
          <WorkTitle>{this.props.work.name}</WorkTitle>
          <WorkRole>{this.props.work.role}</WorkRole>
          <WorkLogo src={this.props.work.logoImgSource} focused={this.state.focused} expanded={this.state.expanded} />
          <WorkDesc expanded={this.state.expanded} >
            {this.props.work.desc}
          </WorkDesc>
          <DropdownArrow>
            <FloatText from={-3} to={0}>
              <Icon name={this.state.expanded ? "chevronUp" : "chevronDown"} size="3vh" color="#FFFFFF"/>
            </FloatText>
          </DropdownArrow>
        </Container>
      </VisibilitySensor>
    );
  }
}


export default WorkShowcase;
