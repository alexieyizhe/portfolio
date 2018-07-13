import React from "react";
import styled from "styled-components";
import posed from "react-pose";
import VisibilitySensor from "react-visibility-sensor";
import { css } from 'styled-components';
import { isMobile, isIOS } from 'react-device-detect';
import { mediaSize } from "../data/configOptions.js";
import onClickOutside from "react-onclickoutside";


const Container = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  width: ${props => props.expanded ? '90%' : '75%'};
  height: auto;
  margin-bottom: 10vh;
  cursor: pointer;
  color: #D7D6D6;

  display: grid;
  padding: 0 5% 0 5%;
  grid-template-rows: auto auto auto;
  grid-template-areas: "title"
                       "role"
                       "desc";

  background: url(${props => props.bg}) center/cover;
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
    background-color: rgba(0, 0, 0, 0.75);
    opacity: 1;
    transition: opacity 500ms;
  }

  ${props => props.focused || props.expanded ? css`
    filter: none;
    background: url(${props => props.bg}) center/cover;

    &:before {
      opacity: 1;
    }

    &:after {
      opacity: 0.9;
    }
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
    width: 70%;
    padding: 0 10% 0 10%;
    margin-bottom: 12vh;

    grid-template-rows: auto auto auto;
    grid-template-areas: "title"
                         "role"
                         "desc";
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
  right: -7vw;
  max-width: 35vw;
  max-height: 20vh;

  opacity: 0;
  transition: all 0.3s ease-in;

  ${props => props.focused || props.expanded ? css`opacity: 1;` : null}

  ${mediaSize.tablet`
    top: -5vw;
    max-width: 30vmin;
    max-height: 25vmin;
  `}

  ${mediaSize.phone`
    top: -5vw;
    max-width: 40vw;
    max-height: 50vw;
  `}
`

const WorkRole = styled.div`
  grid-area: role;
  position: relative;
  z-index: 6;
  font-family: "Raleway", serif;;
  font-size: 2vw;
  padding-bottom: 1em;

  ${mediaSize.tablet`
    font-size: 2em;
    padding-bottom: 0.5em;
  `}

  ${mediaSize.phone`
    font-size: 5vw;
  `}
`;

const WorkDesc = styled.div`
  grid-area: desc;
  align-self: start;
  padding-bottom: ${props => props.expanded ? '2vw' : 0};
  line-height: 1.5;
  font-size: 2.5vmin;
  z-index: 6;
  font-family: 'PT Serif', 'Times', serif;
  max-width: 90%;
  max-height: ${props => props.expanded ? '10em' : 0};
  opacity: ${props => props.expanded ? 1 : 0};
  transition: max-height 0.5s, opacity 0.4s, padding 0.5s;

  ${mediaSize.phone`
    font-size: 1em;
    max-height: ${props => props.expanded ? '50em' : 0};
    transition: max-height 1s, opacity 0.7s, padding 1s;
  `}
`

class WorkShowcase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      expanded: false,
    };
  }

  handleClickOutside = evt => {
    this.setState({expanded: false});
  };

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
          onClick={() => this.setState((prevState) => {return {expanded: !prevState.expanded}})}>>
          <WorkTitle>{this.props.work.name}</WorkTitle>
          <WorkRole>{this.props.work.role}</WorkRole>
          <WorkLogo src={this.props.work.logoImgSource} focused={this.state.focused} expanded={this.state.expanded} />
          <WorkDesc expanded={this.state.expanded} >
            {this.props.work.desc}
          </WorkDesc>
        </Container>
      </VisibilitySensor>
    );
  }
}


export default onClickOutside(WorkShowcase);
