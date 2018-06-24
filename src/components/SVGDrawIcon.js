import React from "react";
import styled from "styled-components";
import posed from "react-pose";
import MtSvgLines from 'react-mt-svg-lines';

const Shadow = styled.span`
  position: relative;

  z-index: 1;

  & path {
    stroke: #C4C4C4;
  }
`

const Icon = styled.span`
  position: relative;
  top: 0;
  left: -4vh;
  z-index: 2;
  cursor: pointer;
`;


class SVGDrawIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: false
    };
  }

  render() {
    return (
      <span
        onMouseEnter={() => this.setState({hovering: true})}
        onMouseLeave={() => this.setState({hovering: false})}>
        <Shadow>
          {this.props.children}
        </Shadow>
        <Icon>
          <MtSvgLines animate={ this.state.hovering ? true : "hide" } duration={ 500 }>
            {this.props.children}
          </MtSvgLines>
        </Icon>
      </span>
    );
  }
}

export default SVGDrawIcon;
