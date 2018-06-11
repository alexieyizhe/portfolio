import React from 'react';
import styled from 'styled-components';

class BlinkInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blinkShow: true
    }
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.blink(),
      750
    )
  }

  blink() {
    this.setState((prevState) => {
      return {blinkShow: !prevState.blinkShow};
    });
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return <span style={{visibility: this.state.blinkShow ? 'visible' : 'hidden'}}>_</span>;
  }
}

export default BlinkInput;
