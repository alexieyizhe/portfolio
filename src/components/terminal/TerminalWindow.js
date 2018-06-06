import React from 'react';
import getRenderedSize from 'react-rendered-size';
import TerminalLine from './TerminalLine.js';
import WindowBorder from '../WindowBorder.js';
import WindowNavBar from '../WindowNavBar.js';

const terminalCommands = {
  '--exit': 'Quitting...',
  '--quit': 'Quitting...',
  '--help': 'Showing help...',
  '--credits': 'Built with ♥ by Alex Yizhe Xie (2018)',
  'show --resume': 'Displaying resume...',
  'show --projects': 'Displaying projects...',
  'show --contact': 'Psst...hover over my name!',
  'ls': 'resume.pdf   contact.csv    projects.html   about.html',
  'ls -a': 'resume.pdf   contact.csv    projects.html   about.html\n   .DS_Store   .supersecrettxt',
  'hi': 'hey!',
}
const maxTerminalHistory = 5;




class TerminalWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prevLines: [],
      curCommand: '',
      curLine: 0,
      curPos: 0,
    };
  }

  componentDidMount() {
    this.lineHeight = this.calcLineHeight();
  }

  calcLineHeight() {
    return getRenderedSize(<TerminalLine command={'this is a dummy component'} result={null} curLine={false} />).height;
  }

  enterCommand(key) {
    switch(key) {
      case 'Enter': // match enter to issue command
        this.setState((prevState) => {
          return {
            prevLines: this.fitLinesToWindow(
              prevState.prevLines.concat([{
                  command: prevState.curCommand,
                  result: this.parseCommand(prevState.curCommand),
                  height: this.lineHeight * ((this.parseCommand(prevState.curCommand).match(/\r?\n/g) || '').length + 2),
              }])
            ),
            curCommand: '',
            curLine: 0,
            curPos: 0,
          }
        });
        break;

      case 'Backspace': // match backspace to edit command
        this.setState((prevState) => {
          return {
            curCommand: prevState.curCommand.substring(0, prevState.curCommand.length - 1),
            curPos: Math.max(0, prevState.curPos - 1),
          };
        });
        break;

      case 'ArrowUp':
        this.setState((prevState) => {
          const newLinePos = Math.min(maxTerminalHistory, Math.max(prevState.prevLines.length - 1, 0), prevState.curLine + 1);
          const newCommand = (prevState.prevLines.slice(-1 * newLinePos).shift() || {command: prevState.curCommand}).command;
          return {
            curCommand: newCommand,
            curLine: newLinePos,
            curPos: newCommand.length,
          };
        });
        break;

      case 'ArrowDown':
        this.setState((prevState) => {
          const newLinePos = Math.max(0, prevState.curLine - 1);
          const newCommand = newLinePos === 0 ? '' : (prevState.prevLines.slice(-1 * newLinePos).shift() || {command: prevState.curCommand}).command;
          return {
            curCommand: newCommand,
            curLine: newLinePos,
            curPos: newCommand.length,
          };
        });
        break;

      case 'ArrowLeft':
        this.setState((prevState) => {
          return {
            curPos: Math.max(0, prevState.curPos - 1),
          };
        });
        break;

      case 'ArrowRight':
        this.setState((prevState) => {
          return {
            curPos: Math.min(prevState.curCommand.length, prevState.curPos + 1),
          };
        });
        break;

      case (key.match(/[ -~]/) || {}).input: // match all printable non-return characters
        this.setState((prevState) => {
          return {
            curCommand: [prevState.curCommand.slice(0, prevState.curPos), (key.length === 1 ? key : ''), prevState.curCommand.slice(prevState.curPos)].join(''),
            curPos: prevState.curPos + 1,
          };
        });
        break;
    }
  }

  parseCommand(cmd) {
    return terminalCommands[cmd.toLowerCase()] || ('Command not found: ' + cmd + '\n        Enter \'--help\' for help or \'--quit\' to view regular site.');
  }

  fitLinesToWindow(prevLineArr) {
    this.windowHeight = this.windowDiv.clientHeight - getRenderedSize(<WindowNavBar />).height * 2;

    prevLineArr.reverse(); // reverse to put oldest commands at end of list (so they can be removed first)
    prevLineArr = prevLineArr.filter(line => {
      if(this.windowHeight >= 0) {
        this.windowHeight -= line.height;
        return true;
      }
      return false;
    });
    return prevLineArr.reverse(); // reverse again to preserve original input order
  }

  render() {
    // TODO: Fix bug where element will overflow outside top of window
    return (
      <div ref={windowDiv => {this.windowDiv = windowDiv}} >
        <WindowBorder>
          <div style={{marginTop: this.windowHeight <= 10 ? this.windowHeight : 'default'}}>
            {this.state.prevLines.map((line, indx) => {
              return <TerminalLine key={indx} command={line.command} result={line.result} activeLine={false} />;
            })}
            <TerminalLine command={this.state.curCommand} cmdPos={this.state.curPos} enterCommand={(k) => this.enterCommand(k)} activeLine={true} />
          </div>
        </WindowBorder>
      </div>
    );
  }
}

export default TerminalWindow;
