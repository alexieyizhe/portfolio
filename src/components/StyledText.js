import React from "react";
import styled from "styled-components";
import posed from "react-pose";

const TextAnim = posed.span({
  idle: {
    scale: 1
  },
  hover: {
    scale: 1.2
  },
});



const Text = styled(TextAnim)`
  font-family: ${props => props.fonttype};
  font-size: ${props => props.fontSize};
  color: ${props => props.fontcolor};
`

class StyledText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: false
    };
  }

  render() {
    return (
      <Text
        pose={ this.state.hovering ? 'hover' : 'idle' }
        onMouseEnter={ () => { this.setState({ hovering: true }); this.props.onHover } }
        onMouseLeave={ () => this.setState({ hovering: false }) }
        fonttype={this.props.fontType}
        fontSize={this.props.fontSize}
        fontcolor={this.props.fontColor}
      >{this.props.text}</Text>
    );
  }
}

export default StyledText;
