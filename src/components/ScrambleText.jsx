/*
  SCRAMBLE_TEXT.JS
    A wrapper component for text that scrambles text randomly
    until the desired text is set. Probability of getting a non-scrambled
    character increases until 100% as duration of effect goes on.
*/

import React from 'react';
import styled from 'styled-components';

const ScrambleContainer = styled.span`
  @keyframes pop {
    50% {
      transform: scale(1.05);
    }
  }
  display: inline-block; // Allows scale animation on inline element
  animation: none;
  cursor: default;

  &.boop {
    animation: pop 0.3s ease-in-out 1;
  }
`;

class ScrambleText extends React.Component {
  constructor(props) {
    super(props);
    this.chars = this.props.scramble; // Scrambled characters
    this.state = {
      running: 0, // Amount of time animation has been running
      curText: ' ',
      speed: this.props.options.speed,
      boop: false
    };
  }

  componentDidMount() {
    this.timerID = setTimeout(() => this.updateText(), this.state.speed);
  }

  updateText() {
    this.setState(prevState => {
      return {
        running: prevState.running + this.state.speed,
        curText: this.scrambleText(prevState.curText, this.props.text.length),
        speed: prevState.speed + 5
      };
    });

    if (this.state.curText === this.props.text) {
      clearTimeout(this.timerID);
      this.setState({ boop: true });
    } else {
      this.timerID = setTimeout(() => this.updateText(), this.state.speed);
    }
  }

  scrambleText(text, textLength) {
    let newText = '';
    for (let i = 0; i < textLength; i++) {
      if (text[i] === this.props.text[i]) {
        newText += text[i];
        continue;
      } else if (this.props.text[i] === ' ') {
        newText += this.props.text[i];
        continue;
      }
      // Probability that the current letter will unscramble, higher
      //  chance of choosing right letter as time goes on
      let correctLetterProbability =
        Math.random() + this.state.running / this.props.options.duration / 100;
      // New letter to display at current index in text
      let newLetter =
        correctLetterProbability > 0.95
          ? this.props.text[i]
          : this.chars[Math.floor(Math.random() * this.chars.length)];
      newText += newLetter;
    }
    return newText;
  }

  componentWillUnmount() {
    clearTimeout(this.timerID);
  }

  render() {
    return (
      <ScrambleContainer
        className={this.state.boop ? 'boop' : null}
        onClick={() => this.setState({ boop: true })}
        onAnimationEnd={() => this.setState({ boop: false })}
      >
        {this.state.curText}
      </ScrambleContainer>
    );
  }
}

export default ScrambleText;
