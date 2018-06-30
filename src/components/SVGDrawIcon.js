import React from "react";
import styled from "styled-components";
import posed from "react-pose";
import MtSvgLines from 'react-mt-svg-lines';
import { mediaSize } from "../data/configOptions.js";

const Shadow = styled.span`
  position: absolute;
  z-index: 1;
  & path {
    stroke: #C4C4C4;
  }

  & svg {
    width: ${props => props.size};
    height: ${props => props.size};
    stroke: ${props => props.color};
  }
`

const Outline = styled.span`
  position: relative;
  z-index: 3;
  cursor: pointer;

  & svg {
    width: ${props => props.size};
    height: ${props => props.size};
    stroke: ${props => props.color};
  }
`;

const Icon = styled.span`
  display: inline;
  position: relative;
  margin-bottom: 2vh;
  margin-left: 2vh;
  margin-right: 2vh;
  width: ${props => props.size};
  height: ${props => props.size};
`


class SVGDrawIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: false,
      nextFill: this.props.color
    };
  }

  render() {
    // Animate icons by default if on mobile, otherwise wait for hover
    const shouldAnimate = this.state.hovering ? true : "ontouchstart" in document.documentElement ? 2500 : "hide";

    return (
      <Icon size={this.props.size}
        onMouseEnter={() => this.setState({hovering: true})}
        onMouseLeave={() => this.setState({hovering: false})}>
        <Shadow size={this.props.size} color={this.props.color}>
          {this.props.children}
        </Shadow>
        <Outline size={this.props.size} color={this.props.color}>
          <MtSvgLines animate={ shouldAnimate } duration={ 500 }>
            {this.props.children}
          </MtSvgLines>
        </Outline>
      </Icon>
    );
  }
}

export default SVGDrawIcon;
