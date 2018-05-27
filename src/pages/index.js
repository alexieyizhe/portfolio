import React from 'react'
import Link from 'gatsby-link'
import CommandInput from '../components/command_input.js'

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {curCommand: ''};
  }

  handleCommand(keyCode) {
    switch(keyCode) {
      case 'Enter': // match enter to issue command
        this.setState({curCommand: ''});
        break;

      case 'Backspace': // match enter to issue command
      this.setState((prevState) => {
        return {curCommand: prevState.curCommand.substring(0, prevState.curCommand.length - 1)};
      })
      break;

      case (keyCode.match(/[ -~]/) || {}).input: // match all printable non-return characters
        this.setState((prevState) => {
          return {curCommand: prevState.curCommand + (keyCode.length === 1 ? keyCode : '')};
        })
        break;
    }

    // for testing
    console.log(keyCode);
    console.log(this.state);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <h1>Alex Xie</h1>
        <p>Personal website/portfolio</p>
        <p>
          > <CommandInput
              curCommand={this.state.curCommand}
              editCommand={(k) => this.handleCommand(k)}
            />
        </p>
      </div>
    )
  }
}

export default IndexPage;
