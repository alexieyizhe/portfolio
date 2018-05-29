import React from 'react';
import Link from 'gatsby-link';
import FontAwesome from 'react-fontawesome';
import TerminalWindow from '../components/terminalWindow.js';
import '../styles/global.css';

function IndexPage(props) {
  return (
    <div>
      <div id="mainIntro">alex xie.</div>
      <TerminalWindow />
    </div>
  )
}

export default IndexPage;
