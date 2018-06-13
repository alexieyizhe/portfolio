import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import TerminalWindow from '../components/terminal/TerminalWindow.js';
import WindowBorder from '../components/WindowBorder.js';
import BlinkInput from '../components/BlinkInput.js';
import '../styles/global.css';

/*
ANIMATION STEPS NEEDED
alex xie
> hi@alexieyizhe.me
> resume_alex_xie.pdf
> alexieyizhe
hi@alexieyizhe.me
> resume_alex_xie.pdf
> alexieyizhe
resume_alex_xie.pdf
> alexieyizhe
*/


const Title = styled.div`
  display: flex;
  font-family: "SF UI Display", serif;
  font-weight: lighter;
  font-size: 15vmin;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-left: 5vmin;
  color: #383838;
  cursor: pointer;

  &:hover {
    text-shadow: 3px 3px 0px rgba(0,0,0,0.2);
  }
`;

const Subtitle = styled.div`
  display: flex;
  font-family: "SF UI Display", serif;
  font-weight: lighter;
  font-size: 2.5vmin;
  justify-content: center;
  align-items: center;
  width: 100%;
  white-space: pre;
  cursor: default;
`;

const MainLink = styled.span`
  position: relative;
  cursor: pointer;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: 3.2vmin;
    border-bottom: 3px solid #656565;
    opacity: 0;
    width: 0;
    transition: width .5s ease, opacity .5s ease;
  }
  &:hover {
    text-shadow: 1px 2px 1px rgba(0,0,0,0.3);
  }

  &:hover:after, &.selected:after {
    width: 75%;
    opacity: 1;
  }
`;

const MainContainer = styled.div``;

const linkInfo = {
  profile: {
    link: 'https://www.facebook.com/alexieyizhe',
    text: 'alex xie',
    desc: 'a little about me.',
    animations: null
  },
  contact: {
    link: 'mailto:hi@alexieyizhe.me',
    text: 'hi@alexieyizhe.me',
    desc: 'let\'s talk!',
    animations: null
  },
  resume: {
    link: 'https://www.google.com/',
    text: 'resume_alex_xie.pdf',
    desc: 'view my skills, experience, and qualifications',
    animations: null
  },
  github: {
    link: 'https://www.github.com/alexieyizhe/',
    text: '/gh/alexieyizhe',
    desc: 'check out my other projects!',
    animations: null
  },
  linkedin: {
    link: 'https://www.linkedin.com/in/alexieyizhe/',
    text: '/in/alexieyizhe',
    desc: 'about me',
    animations: null
  },
}

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayContents: 'profile'
    }
  }

  selectLink(link) {
    if(link === this.state.displayContents) {
      this.setState({
        displayContents: 'profile'
      });
    } else {
      this.setState({
        displayContents: link
      });
    }
  }

  openLink() {
    window.open(linkInfo[this.state.displayContents].link, '_blank')
  }

  render() {
    return (
      <MainContainer>

        <div id="page0" style={{position: 'absolute', top: '0%', width: '100%', height: '100%', display: 'flex', alignItems: 'center', flexFlow: 'row wrap', justifyContent: 'center', alignContent: 'center' }}>
          <Title onClick={() => this.openLink()}>{linkInfo[this.state.displayContents].text}<BlinkInput /></Title>
          <Subtitle>
            <MainLink onClick={() => this.selectLink('contact')} className={this.state.displayContents === 'contact' ? 'selected' : ''}>
              contact
            </MainLink>
            &nbsp;&nbsp;/&nbsp;&nbsp;
            <MainLink onClick={() => this.selectLink('resume')} className={this.state.displayContents === 'resume' ? 'selected' : ''}>
              resume
            </MainLink>
            &nbsp;&nbsp;/&nbsp;&nbsp;
            <MainLink onClick={() => this.selectLink('github')} className={this.state.displayContents === 'github' ? 'selected' : ''}>
              projects
            </MainLink>
            &nbsp;&nbsp;/&nbsp;&nbsp;
            <MainLink onClick={() => this.selectLink('linkedin')} className={this.state.displayContents === 'linkedin' ? 'selected' : ''}>
              connect
            </MainLink>
          </Subtitle>
        </div>
        <div id="page1" style={{position: 'absolute', top: '100%', width: '100%', height: '100%' }}>
          <TerminalWindow />
        </div>

      </MainContainer>
    )
  }
}

export default IndexPage;
