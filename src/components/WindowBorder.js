import React from 'react';
import styled from 'styled-components';
import WindowNavBar from './WindowNavBar.js'

const Window = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 75%;
  height: 500px;
  margin-top: 5%;
  color: white;
  background-color: #171717;
  border-radius: 8px;
  -moz-box-shadow: 0 0 15px rgba(0, 0, 0, 0.6);
  -webkit-box-shadow: 0 0 15px rgba(0, 0, 0, 0.6);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.6);
`;

class windowBorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {height: 300};
  }

  render() {
    return (
      <Window>
        <WindowNavBar />
        {this.props.children}
      </Window>
    );
  }

}

export default windowBorder;
