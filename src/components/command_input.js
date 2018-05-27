import React from 'react';
import '../layouts/command_input.css';

class CommandInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blinkShow: true,
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.blink(),
      500
    )
    this.commandInputLine.focus();
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  blink() {
    this.setState((prevState) => {
      return {blinkShow: !prevState.blinkShow};
    });
  }

  handleInput(e) {
    this.props.editCommand(e.key);
  }

  render() {
    return (
      <span className="commandInputLine" tabIndex="0" onKeyDown={(e) => this.handleInput(e)} ref={(elem) => {this.commandInputLine = elem}} >
        {this.props.curCommand}{this.state.blinkShow ? '|' : ''}
      </span>
    );
  }
}

export default CommandInput;
