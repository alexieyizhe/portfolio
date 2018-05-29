import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import TerminalWindow from '../components/terminal/TerminalWindow.js';
import WindowBorder from '../components/WindowBorder.js';
import '../styles/global.css';

const Intro = styled.div`
  font-family: "SF UI Display", serif;
  font-weight: lighter;
  font-size: 7em;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  margin-top: 10%;
  cursor: pointer;
`;

const MainContainer = styled.div``;

function IndexPage(props) {
  return (

    <MainContainer>
      <Intro> alex xie. </Intro>
      <TerminalWindow />
    </MainContainer>
  )
}

export default IndexPage;
