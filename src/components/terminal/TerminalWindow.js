import React from 'react';
import getRenderedSize from 'react-rendered-size';
import TerminalLine from './TerminalLine.js';
import WindowBorder from '../WindowBorder.js';
import WindowNavBar from '../WindowNavBar.js';

const terminalCommands = {
  '--exit': 'qui\n\ntt\ning...',
  '--quit': 'quitting...',
  'hi': 'hey!',
  '--help': 'showing help...',
}




class TerminalWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prevLines: [],
      curCommand: ['', ''],
      curPos: 0,
    };

  }

  enterCommand(key) {
    console.log(key)
    switch(key) {
      case 'Enter': // match enter to issue command
        this.setState((prevState) => {
          return {
            prevLines: this.fitLinesToWindow(
              prevState.prevLines.concat([{
                  command: prevState.curCommand,
                  result: this.parseCommand(prevState.curCommand.join('')),
                  height: getRenderedSize(<TerminalLine command={prevState.curCommand} result={this.parseCommand(prevState.curCommand.join(''))} curLine={false} />).height,
              }])
            ),
            curCommand: ['', ''],
            curPos: 0,
          }
        });
        break;

      case 'Backspace': // match backspace to edit command
        this.setState((prevState) => {
          return {
            curCommand: [prevState.curCommand[0].substring(0, prevState.curCommand[0].length - 1), prevState.curCommand[1]],
          };
        });
        break;

      /*// UNFINISHED
      case 'ArrowUp':
        this.setState((prevState) => {
          return {
            curCommand: prevState.prevLines[prevState.prevLines.length - prevState.curPos] || prevState.curCommand,
            curPos: Math.min(prevState.prevLines.length - 1, prevState.curPos + 1),
          };
        });
        break;

      // UNFINISHED
      case 'ArrowDown':
        this.setState((prevState) => {
          return {
            curCommand: prevState.prevLines[prevState.prevLines.length - prevState.curPos + 1] || prevState.curCommand,
            curPos: Math.max(0, prevState.curPos - 1),
          };
        });
        break;

      // UNFINISHED
      case 'ArrowLeft':
        this.setState((prevState) => {
          return {
            curCommand: [
              prevState.curCommand[0].substring(0, prevState.curCommand[0].length - 1),
              prevState.curCommand[0][prevState.curCommand[0].length - 1] + prevState.curCommand[1]
            ],
          };
        });
        break;

      // UNFINISHED
      case 'ArrowRight':
        this.setState((prevState) => {
          return {
            curCommand: [
              prevState.curCommand[0] + prevState.curCommand[1][0],
              prevState.curCommand[1].substring(1)
            ],
          };
        });
        break; */

      case (key.match(/[ -~]/) || {}).input: // match all printable non-return characters
        this.setState((prevState) => {
          return {
            curCommand: [
              prevState.curCommand[0] + (key.length === 1 ? key : ''),
              prevState.curCommand[1]
            ],
          };
        });
        break;
    }
  }

  parseCommand(cmd) {
    return terminalCommands[cmd.toLowerCase()] || ('Command not found: ' + cmd);
  }

  fitLinesToWindow(prevLineArr) {
    let windowHeight = this.windowDiv.clientHeight - getRenderedSize(<WindowNavBar />).height * 2;

    prevLineArr.reverse(); // reverse to put oldest commands at end of list (so they can be removed first)
    prevLineArr = prevLineArr.filter(line => {
      if(windowHeight >= 0) {
        windowHeight -= line.height;
        return true;
      }
      return false;
    });

    return prevLineArr.reverse(); // reverse again to preserve original input order
  }

  render() {
    console.log(this.state);
    return (
      <div ref={windowDiv => {this.windowDiv = windowDiv}}>
        <WindowBorder>
          {this.state.prevLines.map((line, indx) => {
            return <TerminalLine key={indx} command={line.command} result={line.result} curLine={false} />;
          })}
          <TerminalLine command={this.state.curCommand} enterCommand={(k) => this.enterCommand(k)} curLine={true} />
        </WindowBorder>
      </div>
    );
  }
}

export default TerminalWindow;
