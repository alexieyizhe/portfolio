import React from 'react';
import '../styles/terminalLine.css';

class TerminalLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blinkShow: true,
      cursorShow: true,
    };
  }

  componentDidMount() {
    if(this.props.curLine){
      this.commandInputLine.focus();
      this.timerID = setInterval(
        () => this.blink(),
        500
      )
    }

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
    this.props.enterCommand(e.key);
  }

  render() {
    return (
      this.props.curLine ?
      <p
        id='curCmdLine'
        tabIndex='0'
        onKeyDown={(e) => this.handleInput(e)}
        ref={(elem) => {this.commandInputLine = elem}}
        onBlur={() => this.setState({cursorShow: false})}
        onFocus={() => this.setState({cursorShow: true})}
       >> {this.props.command}{this.state.blinkShow && this.state.cursorShow ? '_' : ''}
      </p>
       :
      <span>
        {this.props.command !== null ? <p className='prevCmdLine'>> {this.props.command}</p> : null}
        {this.props.result ? <p className='prevCmdLine'>   {this.props.result}</p> : null}
      </span>
    );
  }
}

export default TerminalLine;
