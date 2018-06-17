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

SITE LAYOUT
 - main info/contact
 - FLIPP OVER (entire area is clickable to flip): profile pic, intro, skills/interests
 - WIPE TO REVEAL UNDERNEATH:
    - MASONRY GRID: experience
    - ANOTHER MASONRY GRID: projects
    - ANOTHER GRID: photography
 - DOTS ON SIDE: switch between sections
 ON MOBILE----
  - same, except masonry grid is one tile on screen at a time
*/

const MainContainer = styled.div`
  height: 100%;
`;

const Page = styled.section`
  position: absolute;
  top: 0;
  left: 0;
  height: ${props => props.active ? '100%' : '0'};
  width: 100%;
  background-color: #F6F6F6;
  overflow: auto;
  transition: height 0.7s ease-in-out;

  display: flex;
  align-items: center;
  flex-flow: row wrap;
  justify-content: center;
  align-content: center;

  &:nth-child(1) {
    z-index: 500;
  }
  &:nth-child(2) {
    z-index: 400;
  }
  &:nth-child(3) {
    z-index: 300;
  }
  &:nth-child(4) {
    z-index: 200;
  }
  &:nth-child(5) {
    z-index: 100;
  }
`;

const Title = styled.div`
  display: flex;
  font-family: "SF UI Display", serif;
  font-weight: normal;
  font-size: 15vmin;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-left: 5vmin;
  color: black;
  cursor: pointer;

  &:hover {
    text-shadow: 3px 3px 0px rgba(0,0,0,0.2);
  }
`;

const MainPageSubtitle = styled.div`
  display: flex;
  font-family: "SF UI Display", serif;
  font-weight: normal;
  font-size: 2.5vmin;
  justify-content: center;
  align-items: center;
  width: 100%;
  white-space: pre;
  cursor: default;
`;

const MainPageLink = styled.span`
  position: relative;
  cursor: pointer;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: 3.2vmin;
    border-bottom: 3px solid;
    opacity: 0;
    width: 0;
    transition: width .5s ease, opacity .5s ease;
  }

  &:hover:after, &.selected:after {
    width: 75%;
    opacity: 1;
  }
`;

const LINK_INFO = {
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
};

const PAGE_INFO = {
  main: {},
  experience: {},
  portfolio: {},
  photography: {},
};

const SCROLL_THRESHOLD = 38;
const NUM_PAGES = Object.keys(PAGE_INFO).length;

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainPageContent: 'profile',
      activePageIndex: 1
    }
    this.deltaOnPage = 0;
  }

  prevSlide() {
    this.setState((prevState) => {
      this.deltaOnPage = 0;
      return {activePageIndex: (prevState.activePageIndex - 1 <= 0) ? 0 : prevState.activePageIndex - 1};
    })


  }

  nextSlide() {
    this.setState((prevState) => {
      this.deltaOnPage = 0;
      return {activePageIndex: (prevState.activePageIndex + 1 >= NUM_PAGES) ? NUM_PAGES : prevState.activePageIndex + 1};
    })
  }

  handleScroll(e) {
    if (e.deltaY < 0) { // Scroll down
        this.deltaOnPage--;
        if (Math.abs(this.deltaOnPage) >= SCROLL_THRESHOLD) {
          this.prevSlide();
        }
    }
    else { // Scroll up
        this.deltaOnPage++;
        if (this.deltaOnPage >= SCROLL_THRESHOLD) {
          this.nextSlide();
        }
    }

    return false; // Prevent page from scrolling
  }

  componentDidMount() {
    window.addEventListener('mousewheel', (e) => this.handleScroll(e));
    window.addEventListener('DOMMouseScroll', (e) => this.handleScroll(e));
  }

  componentWillUnmount() {
    window.removeEventListener('mousewheel', (e) => this.handleScroll(e));
    window.removeEventListener('DOMMouseScroll', (e) => this.handleScroll(e));
  }

  selectLink(link) {
    if(link === this.state.mainPageContent) {
      this.setState({
        mainPageContent: 'profile'
      });
    } else {
      this.setState({
        mainPageContent: link
      });
    }
  }

  openLink() {
    window.open(LINK_INFO[this.state.mainPageContent].link, '_blank')
  }

  render() {
    return (
      <MainContainer>

        <Page id="mainInfo" active={this.state.activePageIndex <= 1}>
          <Title onClick={() => this.openLink()}>{LINK_INFO[this.state.mainPageContent].text}<BlinkInput /></Title>
          <MainPageSubtitle>
            <MainPageLink onClick={() => this.selectLink('contact')} className={this.state.mainPageContent === 'contact' ? 'selected' : ''}>
              contact
            </MainPageLink>
            &nbsp;&nbsp;/&nbsp;&nbsp;
            <MainPageLink onClick={() => this.selectLink('resume')} className={this.state.mainPageContent === 'resume' ? 'selected' : ''}>
              resume
            </MainPageLink>
            &nbsp;&nbsp;/&nbsp;&nbsp;
            <MainPageLink onClick={() => this.selectLink('github')} className={this.state.mainPageContent === 'github' ? 'selected' : ''}>
              projects
            </MainPageLink>
            &nbsp;&nbsp;/&nbsp;&nbsp;
            <MainPageLink onClick={() => this.selectLink('linkedin')} className={this.state.mainPageContent === 'linkedin' ? 'selected' : ''}>
              connect
            </MainPageLink>
          </MainPageSubtitle>
        </Page>

        <Page id="experiencePage" active={this.state.activePageIndex <= 2}>
          <Title>Experience</Title>
        </Page>

        <Page id="projectPage" active={this.state.activePageIndex <= 3}>
          <Title>Portfolio</Title>
        </Page>

        <Page id="photographyPage" active={this.state.activePageIndex <= 4}>
          <Title>Photography</Title>
        </Page>

      </MainContainer>
    )
  }
}

export default IndexPage;
