import React from "react";


class ScrambleText extends React.Component {
  constructor(props) {
    super(props);
    this.chars = '!<>-_\\/[]{}—=+*^?#_abiwxevpi'; // Scrambled characters
    this.state = {
      running: 0, // Amount of time animation has been running
      curText: ' ',
      speed: this.props.options.speed
    };
  }

  componentDidMount() {
    this.timerID = setTimeout(
      () => this.updateText(),
      this.state.speed
    )
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
    let newText = '';
    for(let i = 0; i < textLength; i++) {
      if(text[i] === this.props.text[i]) {
        newText += text[i];
        continue;
      } else if(this.props.text[i]=== ' ') {
        newText += this.props.text[i];
        continue;
      }
      let correctLetterProbability = Math.random() + (this.state.running / this.props.options.duration / 100); // Higher chance of hitting right letter closer to duration
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
