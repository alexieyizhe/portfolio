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
    if(this.props.activeLine){
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
    const beforeCursor = this.props.command.substring(0, this.props.cmdPos);
    let atCursor;
    if(this.state.blinkShow && this.state.cursorShow) {
      if(this.props.cmdPos < this.props.command.length) {
        atCursor = <span style={{textDecoration: 'underline'}}>{this.props.command[this.props.cmdPos]}</span>;
      } else {
        atCursor = (this.props.command[this.props.cmdPos] || '') + '_';
      }
    } else {
      atCursor = this.props.command[this.props.cmdPos];
    }
    const afterCursor = this.props.command.substring(this.props.cmdPos + 1);
    return (
      this.props.activeLine ?
      <Line current
        id='curCmdLine'
        tabIndex='0'
        onKeyDown={(e) => this.handleInput(e)}
        onBlur={() => this.setState({cursorShow: false})}
        onFocus={() => this.setState({cursorShow: true})} >
        > {beforeCursor}{atCursor}{afterCursor}
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
