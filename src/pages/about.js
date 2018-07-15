import React from "react";
import styled from "styled-components";
import posed from "react-pose";
import Img from "gatsby-image";
import { mediaSize } from "../data/configOptions.js";
import '../data/font-devicons/devicons.min.css';
import Link from "gatsby-link";
import ReactTooltip from 'react-tooltip';

import TemplateWrapper from "../components/TemplateWrapper.js";
import PageHeader from "../components/PageHeader.js";
import StatCounter from "../components/StatCounter.js";
import Icon from "../components/Icon.js";

const Container = styled.div`
  display: grid;
  grid-template-columns: 30% 1fr;
  grid-template-rows: auto;
  grid-template-areas: "pic stats"
                       "pic skills"
                       "pic interests"
                       "intro intro";
  grid-column-gap: 5vw;
  font-family: 'PT Serif', 'Times', serif;

  ${mediaSize.tablet`
    grid-template-columns: 60% 30%;
    grid-template-rows: auto;
    grid-column-gap: 10%;
    grid-template-areas: "pic stats"
                         "skills stats"
                         "interests stats"
                         "intro intro";
  `}

  ${mediaSize.phone`
    grid-template-columns: 100%;
    grid-template-rows: auto;
    grid-template-areas: "pic"
                         "stats"
                         "skills"
                         "interests"
                         "intro";
  `}
`

const AboutPic = styled.div`
  grid-area: pic;
  width: 100%;
  justify-self: center;
  align-self: center;

  ${mediaSize.tablet`
    width: 90%;
    padding-top: 0.5em;
    padding-bottom: 1em;
    justify-self: center;
  `}
`;

const AboutStats = styled.div`
  grid-area: stats;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20%, 1fr));
  grid-column-gap: 2em;
  align-items: start;

  ${mediaSize.tablet`
    align-items: end;
    text-align: left;
    grid-column-gap: 10em;
    & > * {
      margin-right: 0;
    }
  `}

  ${mediaSize.phone`
    grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
    align-items: start;
    justify-items: center;
    text-align: center;
    grid-column-gap: 2em;
  `}
`;

const AboutSkills = styled.div`
  grid-area: skills;
  font-size: 1.5vw;
  font-family: 'Cabin', arial, sans-serif;
  position: relative;


  & > span {
    margin-right: 1em;
    & > div {
      font-family: 'PT Serif', 'Times', serif;
      margin-top: 1em;
      font-size: 1.5em;
      margin-bottom: 5px;
      position: relative;
      display: inline-block;

      &:before { /* background of title on hover */
        background-color: rgba(155, 219, 125, 0.6);
        opacity: 0.4;
        content: '';
        position: absolute;
        top: 0.45em;
        left: 0.25em;
        right: -5px;
        height: 0.8em;
        z-index: -1;

        width: 95%;

        ${mediaSize.phone`
          top: 0.4em;
          float: none;
          height: 0.9em;
          left: -3px;
          opacity: 0.75;
        `}
      }

    }
  }

  & .__react_component_tooltip {
    display: inline;
  }

  ${mediaSize.tablet`
    font-size: 2em;
    margin-top: 1em;
    & > span {
      & > div {
        font-size: 1.25em;
      }
      & > div:first-child {
        margin-top: 0em;
      }
    }
  `}

  ${mediaSize.phone`
    font-size: 1.5em;
    margin-top: 1em;
    & > span {
      display: block;
      & > div {
        font-size: 1.25em;
        margin-bottom: 0.3em;
      }
    }
  `}
`

const AboutInterests = styled.div`
  grid-area: interests;
  font-size: 1.5vw;
  font-family: 'Cabin', arial, sans-serif;

  & > div {
    font-family: 'PT Serif', 'Times', serif;
    font-size: 1.5em;
    margin-bottom: 5px;
    position: relative;
    display: inline-block;

    &:before { /* background of title on hover */
      background-color: rgba(187, 182, 241, 0.6);
      opacity: 0.6;
      content: '';
      position: absolute;
      top: 0.45em;
      left: 0.25em;
      right: -5px;
      height: 0.8em;
      z-index: -1;

      width: 95%;

      ${mediaSize.phone`
        top: 0.4em;
        float: none;
        height: 0.9em;
        left: -3px;
        opacity: 0.75;
      `}
    }

    ${mediaSize.phone`
      margin-bottom: 0.3em;
    `}
  }

  & span, & a {
    margin-right: 5px;
  }

  & .__react_component_tooltip {
    display: inline;
  }

  ${mediaSize.tablet`
    font-size: 2em;
    & > div {
      font-size: 1.25em;
    }
  `}

  ${mediaSize.phone`
    font-size: 1.5em;
    margin-top: 1em;
    & > span {
      & > div {
        font-size: 1.25em;
        margin-bottom: 0;
      }
      & > div:first-child {
        margin-top: 0.5em;
      }
    }
  `}
`

const AboutIntro = styled.div`
  grid-area: intro;
  line-height: 1.7;
  font-size: 1.5vw;
  margin-top: 2em;
  & a {
    color: black;
    text-decoration: overline;

    &:hover {
      text-decoration: none;
    }
  }

  ${mediaSize.tablet`
    font-size: 1.5em;
  `}

  ${mediaSize.phone`
    font-size: 1em;
  `}
`;

const RevealButton = styled.span`
  opacity: ${props => props.revealed ? 0 : 1};
  transition: opacity 0.75s ease;
  text-decoration: underline;
  cursor: ${props => props.revealed ? 'default' : 'pointer'};;

`

const DetailedIntro = styled.div`
  overflow-y: hidden;
  opacity: ${props => props.revealed ? 1 : 0};
  max-height: ${props => props.revealed ? '500em' : 0};
  transition: max-height 6s ease-in-out, opacity 1s ease;
`

const STATS_COUNTER_DURATION = 3;

class AboutPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      revealed: false
    };
  }

  revealDetailedIntro() {
    this.setState({revealed: true});
  }

  render() {
    return (
      <TemplateWrapper header="alex who?" menu footer curPage="About" outerBounds={{ top: '7%', left: '15%', right: '15%', bottom: '0' }} title="About">
        <div style={this.props.transition && this.props.transition.style}>
          <Container>

            <AboutPic>
              <Img sizes={this.props.data.profileImage.sizes} />
            </AboutPic>

            <AboutStats>
              <StatCounter countStart={0} countEnd={18} countDuration={STATS_COUNTER_DURATION}>
                Trips Around The Sun
              </StatCounter>
              <StatCounter countStart={0} countEnd={2899} countDuration={STATS_COUNTER_DURATION}>
                Hours Spent Coding
              </StatCounter>
              <StatCounter countStart={0} countEnd={8257} countDuration={STATS_COUNTER_DURATION}>
                Soccer Balls Kicked
              </StatCounter>
              <StatCounter countStart={0} countEnd={1} countDuration={STATS_COUNTER_DURATION}>
                Unpronouncable Last Name
              </StatCounter>
            </AboutStats>

            <AboutSkills>

              <span style={{gridArea: 'languages'}}>
                <div>Skills</div> <br/>
                <span data-tip="JavaScript" data-for={`techStackTip1`}>
                  <ReactTooltip id={`techStackTip1`} effect='solid' />
                  <span className="devicons devicons-javascript" style={{fontSize: "1.25em"}} />
                </span>
                <span data-tip="Ruby" data-for={`techStackTip2`}>
                  <ReactTooltip id={`techStackTip2`} effect='solid' />
                  <span className="devicons devicons-ruby" style={{fontSize: "1em", position: "relative", top: "-0.1em"}} />
                </span>
                <span data-tip="Python" data-for={`techStackTip3`}>
                  <ReactTooltip id={`techStackTip3`} effect='solid' />
                  <span className="devicons devicons-python" style={{fontSize: "1.25em"}} />
                </span>
              </span>

              <span style={{gridArea: 'frameworks'}}>
                <span data-tip="React" data-for={`techStackTip4`}>
                  <ReactTooltip id={`techStackTip4`} effect='solid' />
                  <span className="devicons devicons-atom" style={{fontSize: "1.25em"}} />
                </span>
                <span data-tip="Ruby on Rails" data-for={`techStackTip5`}>
                  <ReactTooltip id={`techStackTip5`} effect='solid' />
                  <span className="devicons devicons-ruby_on_rails" style={{fontSize: "1.25em"}} />
                </span>
                <span data-tip="HTML" data-for={`techStackTip6`}>
                  <ReactTooltip id={`techStackTip6`} effect='solid' />
                  <span className="devicons devicons-html5" style={{fontSize: "1.25em"}} />
                </span>
                <span data-tip="CSS" data-for={`techStackTip7`}>
                  <ReactTooltip id={`techStackTip7`} effect='solid' />
                  <span className="devicons devicons-css3" style={{fontSize: "1.25em"}} />
                </span>
                <span data-tip="Ionic 3" data-for={`techStackTip8`}>
                  <ReactTooltip id={`techStackTip8`} effect='solid' />
                  <span className="devicons devicons-ionic" style={{fontSize: "1.25em"}} />
                </span>
                <span data-tip="Angular 4" data-for={`techStackTip9`}>
                  <ReactTooltip id={`techStackTip9`} effect='solid' />
                  <span className="devicons devicons-angular" style={{fontSize: "1.25em"}} />
                </span>
                <span data-tip="MeteorJS" data-for={`techStackTip10`}>
                  <ReactTooltip id={`techStackTip10`} effect='solid' />
                  <span className="devicons devicons-meteor" style={{fontSize: "1.25em"}} />
                </span>
              </span>

              <span style={{gridArea: 'tools'}}>
                <span data-tip="SQL DBs" data-for={`techStackTip11`}>
                  <ReactTooltip id={`techStackTip11`} effect='solid' />
                  <span className="devicons devicons-database" style={{fontSize: "1.25em"}} />
                </span>
                <span data-tip="Shell/Terminal" data-for={`techStackTip12`}>
                  <ReactTooltip id={`techStackTip12`} effect='solid' />
                  <span className="devicons devicons-terminal" style={{fontSize: "1.25em"}} />
                </span>
                <span data-tip="MongoDB" data-for={`techStackTip13`}>
                  <ReactTooltip id={`techStackTip13`} effect='solid' />
                  <span className="devicons devicons-mongodb" style={{fontSize: "1.25em"}} />
                </span>
                <span data-tip="Git" data-for={`techStackTip14`}>
                  <ReactTooltip id={`techStackTip14`} effect='solid' />
                  <span className="devicons devicons-git_branch" style={{fontSize: "1.25em"}} />
                </span>
                <span data-tip="Problem Solving" data-for={`techStackTip15`}>
                  <ReactTooltip id={`techStackTip15`} effect='solid' />
                  <span className="devicons devicons-stackoverflow" style={{fontSize: "1.25em"}} />
                </span>
              </span>
            </AboutSkills>

            <AboutInterests>
              <div>Interests</div> <br/>
              <span data-tip="Travel" data-for={`techStackTip16`}>
                <ReactTooltip id={`techStackTip16`} effect='solid' />
                <Icon name="briefcase" size="1em" color="#000000" />
              </span>
              <span data-tip="Fitness" data-for={`techStackTip17`}>
                <ReactTooltip id={`techStackTip17`} effect='solid' />
                <Icon name="activity" size="1em" color="#000000" />
              </span>
              <span data-tip="Volunteering" data-for={`techStackTip18`}>
                <ReactTooltip id={`techStackTip18`} effect='solid' />
                <Icon name="heart" size="1em" color="#000000" />
              </span>
              <a data-tip="Music" data-for={`techStackTip19`} href="https://open.spotify.com/user/alexieyizhe" target="_blank">
                <ReactTooltip id={`techStackTip19`} effect='solid' />
                <Icon name="headphones" size="1em" color="#000000" />
              </a>
              <span data-tip="Coding" data-for={`techStackTip20`} >
                <ReactTooltip id={`techStackTip20`} effect='solid' />
                <Icon name="code" size="1em" color="#000000" />
              </span>
              <span data-tip="Games" data-for={`techStackTip21`} >
                <ReactTooltip id={`techStackTip21`} effect='solid' />
                <Icon name="crosshair" size="1em" color="#000000" />
              </span>
            </AboutInterests>

            <AboutIntro>
              I'm Alex Yizhe Xie, and I'm currently two-fifths of my way to a Bachelor of Computer Science at the University of Waterloo. I'm Chinese, but my hometown is the city-state of Singapore, Singapore (trippy, I know). These days, I'm proudly Canadian and working as a back-end software engineer at <a href="https://flipp.com/home" target="_blank">Flipp Corp</a>. <RevealButton onClick={() => this.revealDetailedIntro()} revealed={this.state.revealed}>Tell me more!</RevealButton>
              <DetailedIntro revealed={this.state.revealed}>
                <p>
                  I'm a diehard soccer fan, whether it's watching FC Barcelona - my favourite team - or getting on the field myself. Apart from soccer and coding, my other interests are <s>nonexistent</s> fitness, cooking, my husky-malamute Storm, and travelling. I've done a couple of solo trips that you can read about on <Link to="/blog">my blog</Link>!
                </p>
                <p>
                  As a member of the Item Data Platform team at Flipp, I'm working with some other awesome peeps on the system responsible for indexing retailer products to power the results on Flipp's flyers and search results. Even though almost all of the work I'm doing at Flipp is on the back-end, I'm extremely interested in the workings of the entire web stack. Stemming from the fact that I'm a very visual learner, I have a deep fascination with user interfaces and UX design. I absolutely love trawling the web for interesting articles and demos/case studies of said topic - stuff like human-computer interactions and subtle effects on user experience are my bread and butter. It's a major contributing factor to why I'm learning JavaScript, React, responsive design, and how to use tools like Figma and Adobe XD.
                </p>
                <p>
                  My friends always tell me that I'm addicted to coding, but I like to think of it less as an addiction to coding and more as a passion for solving problems. I find myself engrossed in creating solutions to tough problems and pushing myself to always improve my skills and abilities; before you know it, I've been programming for hours upon hours. This is also one aspect of my skills that I'm constantly improving, so I'm also interested in more sustainable and long-term coding practices like Agile development and working in a professional environment.
                </p>
                <p>
                  However, I also believe that creating solutions to problems and learning new ideas aren't limited to the scope of studying and coding. I'm currently working with a huge amount of passionate individuals on organizing a <a href="https://www.tedxuw.com/" target="_blank">700+ attendee TEDx event</a>, powering one of the <a href="https://teamwaterloop.ca/" target="_blank">world's top 25 hyperloop teams</a>, and leading the next iteration of <a href="https://equithon.org/" target="_blank">Waterloo's largest social innovation hackathon</a>. These have been incredibly rewarding learning experiences that I cherish greatly, and I'm hoping to continue contributing and getting involved with various communities now and into the future.
                </p>
                <p>
                  If you've made it this far, props to you 🥂 I'm always looking for new initiatives. If you have any questions or wanna chat, shoot me an email or find me on social media!
                </p>
              </DetailedIntro>
            </AboutIntro>

          </Container>
        </div>

      </TemplateWrapper>
    );
  }
}

export default AboutPage;

export const pageQuery = graphql`
  query AboutPageQuery {
    profileImage: imageSharp(id: { regex: "/about_me.png/" }) {
      sizes(maxWidth: 300) {
        ...GatsbyImageSharpSizes_tracedSVG
      }
    }
  }
`
