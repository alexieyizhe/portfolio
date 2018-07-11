import React from "react";
import styled from "styled-components";
import posed from "react-pose";
import Img from "gatsby-image";

import { mediaSize } from "../data/configOptions.js";
import TemplateWrapper from "../components/TemplateWrapper.js";
import PageHeader from "../components/PageHeader.js";

const ParagraphPic = styled.div`
  padding: 0;
  margin: 2vmin;
  float: ${props => props.imgAlign || 'none'};
  width: ${props => props.maxWidth};

  & a {
    color: black;
  }

  ${mediaSize.phone`
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
    padding-top: 0.5em;
    padding-bottom: 1em;
  `}
`;

const Intro = styled.div`
  font-size: 2.5vh;
  font-family: "PT Serif", Palatino, Times, serif;;

  & > div {
    margin-bottom: 1em;
  }

  & > div:last-child {
    margin-bottom: 0;
  }
`


class AboutPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TemplateWrapper header="alex who?" menu footer curPage="About" outerBounds={{ top: '7%', left: '15%', right: '15%', bottom: '0' }} title="About">
        <div style={this.props.transition && this.props.transition.style}>
          <Intro>

            <ParagraphPic imgAlign="right" maxWidth="15vw">
              <Img sizes={this.props.data.profileImage.sizes} />
            </ParagraphPic>
            <div>
              Yes, I know, it's hard to pronounce my last name. You don't have to tell me.
            </div>


            <div>
              Wait, what's that? You actually want to know more about me?
            </div>


            <div>
              That's awesome! I'm Alex Yizhe Xie, and I'm currently two-fifths of my way into a Bachelor of Computer Science at the University of Waterloo. I'm Chinese, but my hometown is the city-state of Singapore, Singapore (trippy, I know). These days, I'm proudly Canadian and working as a back-end software engineer at <a href="https://flipp.com/home" target="_blank">Flipp Corp</a>. As a member of the Item Data Platform team, I'm working with some other awesome peeps on the system responsible for indexing retailer products to power the results on Flipp's flyers and search results.
            </div>

            <div>
              I'm a diehard soccer fan, whether it's watching FC Barcelona - my favourite team - or getting on the field myself. Apart from soccer and coding, my other interests are <s>nonexistent</s> fitness, cooking, my husky-malamute Storm, and travelling.
              <ParagraphPic imgAlign="left" maxWidth="20vw">
                <Img sizes={this.props.data.travelImage.sizes} />
              </ParagraphPic> I've done a couple of solo trips that you can read about on my blog!

            </div>

            <div>
              Even though almost all of the work I'm doing at Flipp is on the back-end, I'm extremely interested in the workings of the entire web stack. Stemming from the fact that I'm a very visual learner, I have a deep fascination with user interfaces and UX design. I absolutely love trawling the web for interesting articles and demos/case studies of said topic - stuff like human-computer interactions and subtle effects on user experience are my bread and butter. It's a major contributing factor to why I'm learning JavaScript, React, responsive design, and how to use tools like Figma and Adobe XD.
            </div>

            <div>
              My friends always tell me that I'm addicted to coding, but I like to think of it less as an addiction to coding and more as a passion for solving problems. I find myself engrossed in creating solutions to tough problems and pushing myself to always improve my skills and abilities; before you know it, I've been programming for hours upon hours. This is also one aspect of my skills that I hope to improve upon, so I'm also interested in more sustainable and long-term coding practices like Agile development and working in a professional environment.
              <ParagraphPic imgAlign="right" maxWidth="30vw">
                <Img sizes={this.props.data.equithonImage.sizes} />
              </ParagraphPic>
            </div>

            <div>

              However, I also believe that creating solutions to problems and learning new ideas aren't limited to the scope of studying and coding.I'm currently working with a huge amount of passionate individuals on organizing a <a href="https://www.tedxuw.com/" target="_blank">700+ attendee TEDx event</a>, powering one of the <a href="https://teamwaterloop.ca/" target="_blank">world's top 25 hyperloop teams</a>, and leading the next iteration of <a href="https://equithon.org/" target="_blank">Waterloo's largest social innovation hackathon</a>. These have been incredibly rewarding learning experiences that I cherish greatly, and I'm hoping to continue contributing and getting involved with various communities now and into the future.
            </div>
          </Intro>
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
    travelImage: imageSharp(id: { regex: "/about_travel.png/" }) {
      sizes(maxWidth: 400) {
        ...GatsbyImageSharpSizes_tracedSVG
      }
    }
    equithonImage: imageSharp(id: { regex: "/about_equithon.png/" }) {
      sizes(maxWidth: 500) {
        ...GatsbyImageSharpSizes_tracedSVG
      }
    }
  }
`
