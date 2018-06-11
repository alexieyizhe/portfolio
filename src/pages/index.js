import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import TerminalWindow from '../components/terminal/TerminalWindow.js';
import WindowBorder from '../components/WindowBorder.js';
import BlinkInput from '../components/BlinkInput.js';
import '../styles/global.css';

const Title = styled.div`
  display: inline;
  font-family: "SF UI Display", serif;
  font-weight: lighter;
  font-size: 7em;
  cursor: pointer;
  width: 100%;
  white-space: pre;
`;

const Subtitle = styled.div`
  display: inline;
  font-family: "SF UI Display", serif;
  font-weight: lighter;
  font-size: 1.25em;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  cursor: pointer;
  width: 100%;
  white-space: pre;
`;

const MainContainer = styled.div``;

class IndexPage extends React.Component {
  render() {
    return (
      <MainContainer>
        <div id="page0" style={{position: 'absolute', top: '0%', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Title>alex xie</Title>
          <Subtitle>contact  /  resume  /  github  /  linkedin</Subtitle>
        </div>
        <div id="page1" style={{position: 'absolute', top: '100%', width: '100%', height: '100%' }}>
          <TerminalWindow />
        </div>
      </MainContainer>
    )
  }
}

export default IndexPage;
