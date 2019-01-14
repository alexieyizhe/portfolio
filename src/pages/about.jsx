import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import ReactTooltip from 'react-tooltip';
import { mediaSize } from '../data/configOptions';
import '../data/font-devicons/devicons.min.css';
import TemplateWrapper from '../components/TemplateWrapper';
import StatCounter from '../components/StatCounter';
import Icon from '../components/Icon';
import {
  DESC_PARAGRAPHS,
  INTERESTS_LIST,
  SKILLS_LIST,
  STATS_COUNTER_DURATION,
  STATS_LIST
} from '../data/aboutData';

const Container = styled.div`
  display: grid;
  grid-template-columns: 30% 1fr;
  grid-template-rows: auto;
  grid-template-areas:
    'pic stats'
    'pic skills'
    'pic interests'
    'intro intro';
  grid-column-gap: 5vw;
  font-family: 'PT Serif', 'Times', serif;

  ${mediaSize.tablet`
    grid-template-columns: 50% 35%;
    grid-template-rows: auto;
    grid-column-gap: 15%;
    grid-template-areas: "pic stats"
                         "skills stats"
                         "interests stats"
                         "intro intro";
  `} ${mediaSize.phone`
    grid-template-columns: 100%;
    grid-template-rows: auto;
    grid-template-areas: "pic"
                         "stats"
                         "skills"
                         "interests"
                         "intro";
  `};
`;

const AboutPic = styled.div`
  grid-area: pic;
  width: 100%;
  justify-self: center;
  align-self: center;
  position: relative;
  overflow: visible;
  padding-bottom: 2vw;

  &:before {
    content: '';
    position: absolute;
    top: 4vw;
    left: 4vw;
    width: 18vw;
    height: 18vw;
    background-color: #a6caf5;
    opacity: 0.65;

    ${mediaSize.tablet`
      top: 7vw;
      left: 5vw;
      width: 28vw;
      height: 28vw;
    `} ${mediaSize.phone`
      top: 13vw;
      left: 8vw;
      width: 55vw;
      height: 55vw;
    `};
  }

  ${mediaSize.tablet`
    width: 90%;
    padding-top: 0.5em;
    padding-bottom: 1em;
    justify-self: center;
    left: -5vw;
  `};

  ${mediaSize.phone`
    left: -5vw;
  `};
`;

const AboutImg = styled(Img)`
  max-width: 100%;
  max-height: 100%;
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
  `} ${mediaSize.phone`
    grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
    align-items: start;
    justify-items: center;
    text-align: center;
    grid-column-gap: 2em;
  `};
`;

const AboutSkills = styled.div`
  grid-area: skills;
  font-size: 1.5vw;
  font-family: 'Cabin', arial, sans-serif;
  position: relative;
  align-self: end;

  & > span {
    margin-right: 1em;
  }

  & > div {
    font-family: 'PT Serif', 'Times', serif;
    font-size: 1.5em;
    margin-bottom: 5px;
    position: relative;
    display: inline-block;

    &:before {
      /* background of title on hover */
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
      `};
    }
  }

  & .__react_component_tooltip {
    display: inline;
  }

  ${mediaSize.tablet`
    font-size: 2em;
    margin-top: 1em;

    & > div {
      font-size: 1.25em;
      margin-top: 0em;
    }
  `} ${mediaSize.phone`
    font-size: 1.5em;
    & > div {
      font-size: 1.25em;
      margin-bottom: 0.3em;
    }

    & > span {
      display: block;
    }
  `};
`;

const AboutInterests = styled.div`
  grid-area: interests;
  font-size: 1.5vw;
  font-family: 'Cabin', arial, sans-serif;
  align-self: end;

  & > div {
    font-family: 'PT Serif', 'Times', serif;
    font-size: 1.5em;
    margin-bottom: 5px;
    position: relative;
    display: inline-block;

    &:before {
      /* background of title on hover */
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
      `};
    }
  }

  & span,
  & a {
    margin-right: 5px;
  }

  & .__react_component_tooltip {
    display: inline;
  }

  ${mediaSize.tablet`
    font-size: 2em;
    & > div {
      font-size: 1.25em;
      margin-bottom: 0.3em;
    }
  `} ${mediaSize.phone`
    font-size: 1.5em;
    margin-top: 0.5em;
  `};
`;

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
  `} ${mediaSize.phone`
    font-size: 1em;
  `};
`;

const RevealButton = styled.span`
  opacity: ${props => (props.revealed ? 0 : 1)};
  transition: opacity 0.75s ease;
  text-decoration: underline;
  cursor: ${props => (props.revealed ? 'default' : 'pointer')};
`;

const DetailedIntro = styled.div`
  overflow-y: hidden;
  opacity: ${props => (props.revealed ? 1 : 0)};
  max-height: ${props => (props.revealed ? '500em' : 0)};
  transition: max-height 6s ease-in-out, opacity 1s ease;
`;

class AboutPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      revealed: false
    };
  }

  revealDetailedIntro() {
    this.setState({ revealed: true });
  }

  render() {
    return (
      <TemplateWrapper
        header="alex who?"
        menu
        footer
        curPage="About"
        outerBounds={{ top: '7%', left: '15%', right: '15%', bottom: '0' }}
        title="About"
      >
        <div style={this.props.transition && this.props.transition.style}>
          <Container>
            <AboutPic>
              <AboutImg sizes={this.props.data.profileImage.sizes} />
            </AboutPic>

            <AboutStats>
              {STATS_LIST.map((stat, i) => {
                return (
                  <StatCounter
                    key={i}
                    countStart={stat.start}
                    countEnd={stat.end}
                    countDuration={STATS_COUNTER_DURATION}
                    useEasing={true}
                  >
                    {stat.name}
                  </StatCounter>
                );
              })}
            </AboutStats>

            <AboutSkills>
              {/* TODO: figure out why clicking isnt showing tooltip on mobile */}
              <div>Skills</div> <br />
              {SKILLS_LIST.map((category, i) => {
                return (
                  <span key={i} style={{ gridArea: category.type }}>
                    {category.children.map((skill, j) => {
                      return (
                        <span
                          key={j}
                          data-tip={skill.name}
                          data-for={`techStackTip${j}`}
                          style={{ position: 'relative' }}
                        >
                          <ReactTooltip
                            id={`techStackTip${j}`}
                            effect="solid"
                          />
                          <span
                            className={`devicons devicons-${skill.icon}`}
                            style={{ fontSize: '1.25em' }}
                          />
                        </span>
                      );
                    })}
                  </span>
                );
              })}
            </AboutSkills>

            <AboutInterests>
              <div>Interests</div> <br />
              {INTERESTS_LIST.map((interest, i) => {
                return (
                  <span
                    key={i}
                    data-tip={interest.name}
                    data-for={`interestTip${i}`}
                  >
                    <ReactTooltip id={`interestTip${i}`} effect="solid" />
                    <Icon name={interest.icon} size="1em" color="#000000" />
                  </span>
                );
              })}
              <a
                data-tip="Music"
                data-for="interestTipMusic"
                href="https://open.spotify.com/user/alexieyizhe"
                target="_blank"
                rel="noreferrer noopener"
              >
                <ReactTooltip id="interestTipMusic" effect="solid" />
                <Icon name="headphones" size="1em" color="#000000" />
              </a>
            </AboutInterests>

            <AboutIntro>
              I'm Alex Yizhe Xie, and I'm currently two-fifths of my way to a
              Bachelor of Computer Science at the University of Waterloo. My
              hometown is Singapore, Singapore (trippy, I know), but these days,
              I'm proudly Canadian and extremely excited for both the future of
              technology and the next journey I'm going to embark on! <br />
              <RevealButton
                onClick={() => this.revealDetailedIntro()}
                revealed={this.state.revealed}
              >
                Tell me more!
              </RevealButton>
              <DetailedIntro revealed={this.state.revealed}>
                {DESC_PARAGRAPHS.map((para, i) => {
                  return <p key={i}>{para}</p>;
                })}
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
      sizes(maxWidth: 400) {
        ...GatsbyImageSharpSizes_tracedSVG
      }
    }
  }
`;
