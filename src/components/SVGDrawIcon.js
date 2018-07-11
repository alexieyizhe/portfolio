import React from "react";
import styled from "styled-components";
import MtSvgLines from 'react-mt-svg-lines';


const Shadow = styled.span`
  position: absolute;
  z-index: 1;

  & path {
    stroke: #C4C4C4;
  }
`

const Outline = styled.span`
  position: relative;
  z-index: 3;
  cursor: pointer;
`;

const Icon = styled.span`
  display: inline;
  position: relative;
`


class SVGDrawIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animate: false,
    }
  }

  handleHover(hovering) {
    if(this.props.ignoreHover) {

    } else {
      this.setState({animate: hovering});
    }
  }

  render() {
    let shouldAnimate = "hide";
    if(this.props && this.props.animate) {
      shouldAnimate = true;
    } else {
      shouldAnimate = this.state.animate || "hide";
    }

    return (
      <Icon
        onMouseEnter={() => this.handleHover(true)}
        onMouseLeave={() => this.handleHover(false)}>
        <Shadow>
          {this.props.children}
        </Shadow>
        <Outline>
          <MtSvgLines animate={ shouldAnimate } duration={ this.props.duration || 500 }>
            {this.props.children}
          </MtSvgLines>
        </Outline>
      </Icon>
    );
  }
}

export default SVGDrawIcon;
