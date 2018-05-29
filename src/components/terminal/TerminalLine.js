import React from 'react';
import styled from 'styled-components';

const Line = styled.div`
  font-family: 'Hack', monospace, sans-serif;
  padding-left: 20px;
  padding-right: 20px;
  margin: 0.25em;
  padding-top: 0;
  padding-bottom: 0;
  margin-top: 0;
  margin-bottom: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  color: ${props => props.current ? 'white' : '#C8C8C8'};

  &:hover {
    cursor: text;
  }

  &:focus {
    outline: none;
  }
`;

class TerminalLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blinkShow: true,
      cursorShow: false,
    };
  }

  componentDidMount() {
    if(this.props.curLine){
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
      <Line current
        id='curCmdLine'
        tabIndex='0'
        onKeyDown={(e) => this.handleInput(e)}
        onBlur={() => this.setState({cursorShow: false})}
        onFocus={() => this.setState({cursorShow: true})}
       >> {this.props.command[0]}{this.state.blinkShow && this.state.cursorShow ? '_' : ''}{this.props.command[1]}
     </Line>
       :
      <Line className='prevCmdLine'>
        {this.props.command !== null ? <div>> {this.props.command}</div> : null}
        {this.props.result ? <div>   {this.props.result}</div> : null}
      </Line>
    );
  }
}

export default TerminalLine;
