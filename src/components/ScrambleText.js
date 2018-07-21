/*
  SCRAMBLE_TEXT.JS
    A wrapper component for text that scrambles text randomly
    until the desired text is set. Probability of getting a non-scrambled
    character increases until 100% as duration of effect goes on.
*/

import React from "react";


class ScrambleText extends React.Component {
  constructor(props) {
    super(props);
    this.chars = this.props.scramble; // Scrambled characters
    this.state = {
      running: 0, // Amount of time animation has been running
      curText: " ",
      speed: this.props.options.speed
    };
  }

  componentDidMount() {
    this.timerID = setTimeout(
      () => this.updateText(),
      this.state.speed
    );
  }

  updateText() {
    this.setState((prevState) => {
      return {
        running: prevState.running + this.state.speed,
        curText: this.scrambleText(prevState.curText, this.props.text.length),
        speed: prevState.speed + 5
      };
    });
    
    if(this.state.running >= this.props.options.duration && this.state.curText === this.props.text) {
      clearTimeout(this.timerID);
    } else {
      this.timerID = setTimeout(
        () => this.updateText(),
        this.state.speed
      )
    }
  }

  scrambleText(text, textLength) {
    let newText = "";
    for(let i = 0; i < textLength; i++) {
      if(text[i] === this.props.text[i]) {
        newText += text[i];
        continue;
      } else if(this.props.text[i]=== " ") {
        newText += this.props.text[i];
        continue;
      }
      // Probability that the current letter will unscramble
      let correctLetterProbability = Math.random() + (this.state.running / this.props.options.duration / 100); // Higher chance of hitting right letter closer to duration
      // New letter to display at current index in text
      let newLetter = correctLetterProbability > 0.95 ? this.props.text[i] : this.chars[Math.floor(Math.random() * this.chars.length)];
      newText += newLetter;
    }
    return newText;
  }

  componentWillUnmount() {
    clearTimeout(this.timerID);
  }

  render() {
    return (
      <span>
        {this.state.curText}
      </span>
    );
  }
}

export default ScrambleText;
