import React from "react";
import styled from "styled-components";
import posed from "react-pose";
import Img from "gatsby-image";
import { isMobileOnly } from 'react-device-detect';
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
  grid-template-columns: 21vw auto auto;
  grid-template-rows: auto auto auto;
  grid-template-areas: "pic stats stats"
                       "pic skills skills"
                       "intro intro intro";
  font-family: 'PT Serif', 'Times', serif;

  ${mediaSize.tablet`
    grid-template-columns: 100%;
    grid-template-rows: auto auto auto auto;
    grid-template-areas: "pic"
                         "stats"
                         "skills"
                         "intro";
  `}
`

const AboutPic = styled.div`
  grid-area: pic;
  padding: 0;
  margin: 2vmin;
  width: ${props => props.maxWidth};

  ${mediaSize.tablet`
    width: 90%;
    padding-top: 0.5em;
    padding-bottom: 1em;
    justify-self: center;
  `}
`;

const AboutStats = styled.div`
  grid-area: stats;
  & > * {
    margin-right: 4vw;
  }

  ${mediaSize.tablet`
    justify-self: center;
    text-align: center;
    & > * {
      margin-right: 0;
    }
  `}
`;

const AboutSkills = styled.div`
  grid-area: skills;
  font-size: 2em;
  font-family: 'Cabin', arial, sans-serif;

  & > span {
    margin-right: 1.5em;
    & > div {
      font-family: 'PT Serif', 'Times', serif;
      margin-top: 1em;
      margin-bottom: 5px;
    }
  }

  & > span:last-child {
    & > span, > a {
      margin-right: 10px;
    }

  }

  & .__react_component_tooltip {
    display: inline;
  }

  ${mediaSize.phone`
    font-size: 1.5em;
    display: grid;
    grid-template-rows: auto auto auto auto;
    grid-template-areas: "languages" "frameworks" "tools" "interests";
    justify-items: center;
    align-items: center;
    text-align: center;

    & > span {
      margin-right: 0;
      & > div {
        margin-bottom: 0.5em;
      }
    }
  `}
`

const AboutIntro = styled.div`
  grid-area: intro;
  line-height: 1.7;
  font-size: 1.5em;
  margin-top: 2.5em;
  & a {
    color: black;
    text-decoration: overline;

    &:hover {
      text-decoration: none;
    }
  }

  ${mediaSize.phone`
    font-size: 1em;
  `}
`;

const RevealButton = styled.span`
  display: ${props => props.revealed ? 'none' : 'inline'};
  text-decoration: underline;
  cursor: pointer;

  ${mediaSize.phone`
    display: ${props => props.revealed ? 'none' : 'block'};
    margin-top: 1em;
    text-align: center;
  `}
`

const DetailedIntro = styled.div`
  overflow-y: hidden;
  opacity: ${props => props.revealed ? 1 : 0};
  max-height: ${props => props.revealed ? '500em' : 0};
  transition: max-height 6s ease-in-out, opacity 1s ease;
`

const STATS_COUNTER_DURATION = 4;


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

            <AboutPic maxWidth="15vw">
              <Img sizes={this.props.data.profileImage.sizes} />
            </AboutPic>

            <AboutStats>
              <StatCounter countStart={0} countEnd={18} countDuration={STATS_COUNTER_DURATION}>
                Trips Around The Sun
              </StatCounter>
              <StatCounter countStart={0} countEnd={358231} countDuration={STATS_COUNTER_DURATION}>
                Lines of Code Written
              </StatCounter>
              <StatCounter countStart={0} countEnd={1328} countDuration={STATS_COUNTER_DURATION}>
                Mispronounciations Of My Last Name
              </StatCounter>
              <StatCounter countStart={0} countEnd={894} countDuration={STATS_COUNTER_DURATION}>
                Soccer Balls Kicked
              </StatCounter>
            </AboutStats>

            <AboutSkills>

              <span style={{gridArea: 'languages'}}>
                <div>Skills</div>
                <span data-tip="JavaScript" data-for={`techStackTip1`}>
                  <ReactTooltip id={`techStackTip1`} effect='solid' />
                  <span className="devicons devicons-javascript" style={{fontSize: "1.5em"}} />
                </span>
                <span data-tip="Ruby" data-for={`techStackTip2`}>
                  <ReactTooltip id={`techStackTip2`} effect='solid' />
                  <span className="devicons devicons-ruby" style={{fontSize: "1.35em"}} />
                </span>
                <span data-tip="Python" data-for={`techStackTip3`}>
                  <ReactTooltip id={`techStackTip3`} effect='solid' />
                  <span className="devicons devicons-python" style={{fontSize: "1.5em"}} />
                </span>
              </span>

              <span style={{gridArea: 'frameworks'}}>
                <span data-tip="React" data-for={`techStackTip4`}>
                  <ReactTooltip id={`techStackTip4`} effect='solid' />
                  <span className="devicons devicons-atom" style={{fontSize: "1.5em"}} />
                </span>
                <span data-tip="Ruby on Rails" data-for={`techStackTip5`}>
                  <ReactTooltip id={`techStackTip5`} effect='solid' />
                  <span className="devicons devicons-ruby_on_rails" style={{fontSize: "1.5em"}} />
                </span>
                <span data-tip="HTML" data-for={`techStackTip6`}>
                  <ReactTooltip id={`techStackTip6`} effect='solid' />
                  <span className="devicons devicons-html5" style={{fontSize: "1.5em"}} />
                </span>
                <span data-tip="CSS" data-for={`techStackTip7`}>
                  <ReactTooltip id={`techStackTip7`} effect='solid' />
                  <span className="devicons devicons-css3" style={{fontSize: "1.5em"}} />
                </span>
                <span data-tip="Ionic 3" data-for={`techStackTip8`}>
                  <ReactTooltip id={`techStackTip8`} effect='solid' />
                  <span className="devicons devicons-ionic" style={{fontSize: "1.5em"}} />
                </span>
                <span data-tip="Angular 4" data-for={`techStackTip9`}>
                  <ReactTooltip id={`techStackTip9`} effect='solid' />
                  <span className="devicons devicons-angular" style={{fontSize: "1.5em"}} />
                </span>
                <span data-tip="MeteorJS" data-for={`techStackTip10`}>
                  <ReactTooltip id={`techStackTip10`} effect='solid' />
                  <span className="devicons devicons-meteor" style={{fontSize: "1.5em"}} />
                </span>
              </span>

              <span style={{gridArea: 'tools'}}>
                <span data-tip="SQL DBs" data-for={`techStackTip11`}>
                  <ReactTooltip id={`techStackTip11`} effect='solid' />
                  <span className="devicons devicons-database" style={{fontSize: "1.5em"}} />
                </span>
                <span data-tip="Shell/Terminal" data-for={`techStackTip12`}>
                  <ReactTooltip id={`techStackTip12`} effect='solid' />
                  <span className="devicons devicons-terminal" style={{fontSize: "1.5em"}} />
                </span>
                <span data-tip="MongoDB" data-for={`techStackTip13`}>
                  <ReactTooltip id={`techStackTip13`} effect='solid' />
                  <span className="devicons devicons-mongodb" style={{fontSize: "1.5em"}} />
                </span>
                <span data-tip="Git" data-for={`techStackTip14`}>
                  <ReactTooltip id={`techStackTip14`} effect='solid' />
                  <span className="devicons devicons-git_branch" style={{fontSize: "1.5em"}} />
                </span>
                <span data-tip="Finding Answers" data-for={`techStackTip15`}>
                  <ReactTooltip id={`techStackTip15`} effect='solid' />
                  <span className="devicons devicons-stackoverflow" style={{fontSize: "1.5em"}} />
                </span>
              </span>

              <span style={{gridArea: 'interests'}}>
                <div>Interests</div>
                <span data-tip="Travel" data-for={`techStackTip16`}>
                  <ReactTooltip id={`techStackTip16`} effect='solid' />
                  <Icon name="briefcase" size="1em" color="#000000" />
                </span>&nbsp;
                <span data-tip="Fitness" data-for={`techStackTip17`}>
                  <ReactTooltip id={`techStackTip17`} effect='solid' />
                  <Icon name="activity" size="1em" color="#000000" />
                </span>&nbsp;
                <span data-tip="Volunteering" data-for={`techStackTip18`}>
                  <ReactTooltip id={`techStackTip18`} effect='solid' />
                  <Icon name="heart" size="1em" color="#000000" />
                </span>&nbsp;
                <a data-tip="Music" data-for={`techStackTip19`} href="https://open.spotify.com/user/alexieyizhe" target="_blank">
                  <ReactTooltip id={`techStackTip19`} effect='solid' />
                  <Icon name="headphones" size="1em" color="#000000" />
                </a>&nbsp;
                <span data-tip="Coding" data-for={`techStackTip20`} >
                  <ReactTooltip id={`techStackTip20`} effect='solid' />
                  <Icon name="code" size="1em" color="#000000" />
                </span>&nbsp;
                <span data-tip="Games" data-for={`techStackTip21`} >
                  <ReactTooltip id={`techStackTip21`} effect='solid' />
                  <Icon name="crosshair" size="1em" color="#000000" />
                </span>

              </span>
            </AboutSkills>

            <AboutIntro>
              I'm Alex Yizhe Xie, and I'm currently two-fifths of my way into a Bachelor of Computer Science at the University of Waterloo. I'm Chinese, but my hometown is the city-state of Singapore, Singapore (trippy, I know). These days, I'm proudly Canadian and working as a back-end software engineer at <a href="https://flipp.com/home" target="_blank">Flipp Corp</a>. <RevealButton onClick={() => this.revealDetailedIntro()} revealed={this.state.revealed}>tell me more!</RevealButton>
              <DetailedIntro revealed={this.state.revealed}>
                <p>
                  I'm a diehard soccer fan, whether it's watching FC Barcelona - my favourite team - or getting on the field myself. Apart from soccer and coding, my other interests are <s>nonexistent</s> fitness, cooking, my husky-malamute Storm, and travelling. I've done a couple of solo trips that you can read about on <Link to="/blog">my blog</Link>!
                </p>
                <p>
                  As a member of the Item Data Platform team at Flipp, I'm working with some other awesome peeps on the system responsible for indexing retailer products to power the results on Flipp's flyers and search results. Even though almost all of the work I'm doing at Flipp is on the back-end, I'm extremely interested in the workings of the entire web stack. Stemming from the fact that I'm a very visual learner, I have a deep fascination with user interfaces and UX design. I absolutely love trawling the web for interesting articles and demos/case studies of said topic - stuff like human-computer interactions and subtle effects on user experience are my bread and butter. It's a major contributing factor to why I'm learning JavaScript, React, responsive design, and how to use tools like Figma and Adobe XD.
                </p>
                <p>
                  My friends always tell me that I'm addicted to coding, but I like to think of it less as an addiction to coding and more as a passion for solving problems. I find myself engrossed in creating solutions to tough problems and pushing myself to always improve my skills and abilities; before you know it, I've been programming for hours upon hours. This is also one aspect of my skills that I hope to improve upon, so I'm also interested in more sustainable and long-term coding practices like Agile development and working in a professional environment.
                </p>
                <p>
                  However, I also believe that creating solutions to problems and learning new ideas aren't limited to the scope of studying and coding.I'm currently working with a huge amount of passionate individuals on organizing a <a href="https://www.tedxuw.com/" target="_blank">700+ attendee TEDx event</a>, powering one of the <a href="https://teamwaterloop.ca/" target="_blank">world's top 25 hyperloop teams</a>, and leading the next iteration of <a href="https://equithon.org/" target="_blank">Waterloo's largest social innovation hackathon</a>. These have been incredibly rewarding learning experiences that I cherish greatly, and I'm hoping to continue contributing and getting involved with various communities now and into the future.
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

/* old about page

const Intro = styled.div`
  font-size: 2.5vh;
  font-family: "PT Serif", Palatino, Times, serif;
  line-height: 1.7;

  & > div {
    margin-bottom: 1.5em;
  }

  & > div:last-child {
    margin-bottom: 0;
  }

  & a {
    color: black;
    text-decoration: overline;

    &:hover {
      text-decoration: none;
    }
  }
`



<ParagraphPic imgAlign="right" maxWidth="15vw">
  <Img sizes={this.props.data.profileImage.sizes} />
</ParagraphPic>
<ParagraphPic imgAlign="left" maxWidth="20vw">
  <Img sizes={this.props.data.travelImage.sizes} />
</ParagraphPic>
<ParagraphPic imgAlign="right" maxWidth="30vw">
  <Img sizes={this.props.data.equithonImage.sizes} />
</ParagraphPic>
<div>
  Yes, I know, it's hard to pronounce my last name. You don't have to tell me.
</div>


<div>
  Wait, what's that? You actually want to know more about me?
</div>


<div>

</div>

<div>


</div>

<div>

</div>

<div>

</div>

<div>


</div>

*/
