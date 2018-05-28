import React from 'react';
import TerminalLine from './TerminalLine.js';

class TerminalWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prevLines: [
        {command: null, result: 'Session restored: Personal website/portfolio of Alex Xie.'},
        {command: null, result: 'Type a command to get started, or --help for help.'},
        {command: 'git status', result: '2 files modified: app/resources/resume.pdf, ...'},
      ],
      curCommand: '',
    };
  }

  enterCommand(key) {
    switch(key) {
      case 'Enter': // match enter to issue command
        this.setState((prevState) => {
          console.log(this.state);
          return {
            prevLines: prevState.prevLines.concat(
              [{command: prevState.curCommand, result: this.parseCommand(prevState.curCommand)}]
            ),
            curCommand: '',
          }
        });
        break;

      case 'Backspace': // match backspace to edit command
        this.setState((prevState) => {
          console.log(this.state);
          return {prevLines: prevState.prevLines, curCommand: prevState.curCommand.substring(0, prevState.curCommand.length - 1)};
        });
        break;

      case (key.match(/[ -~]/) || {}).input: // match all printable non-return characters
        this.setState((prevState) => {
          console.log(this.state);
          return {prevLines: prevState.prevLines, curCommand: prevState.curCommand + (key.length === 1 ? key : '')};
        });
        break;
    }

  }

  parseCommand(cmd) {
    return 'Command not found: ' + cmd;
  }

  render() {
    return (
      <div id='terminalWindow'>
        <div id='terminalNavbar'></div>
        {console.log(this.state)}
        {this.state.prevLines.map((line, indx) => {
          return <TerminalLine key={indx} command={line.command} result={line.result} curLine={false} />;
        })}
        <TerminalLine command={this.state.curCommand} enterCommand={(k) => this.enterCommand(k)} curLine={true} />
      </div>
    )
  }
}

export default TerminalWindow;
