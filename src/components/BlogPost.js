import React from "react";
import styled from "styled-components";
import posed from "react-pose";
import Img from "gatsby-image";
import VisibilitySensor from "react-visibility-sensor";
import { css } from 'styled-components';
import { isMobile } from 'react-device-detect';
import { mediaSize } from "../data/configOptions.js";

import SVGDrawIcon from "./SVGDrawIcon.js";
import Icon from "./Icon.js";


const ContainerConfig = {
  enter: {
    opacity: 0
  },
  normal: {
    opacity: 1,
    scale: 1
  },
  hovered: {
    opacity: 1,
    scale: 1.05
  }
}

const Container = styled(posed.div(ContainerConfig))`
  width: 100%;
  height: auto;
  padding-bottom: 7%;
  cursor: pointer;

  display: grid;
  grid-template-columns: 4fr 6fr;
  grid-template-rows: auto 1fr 1.5fr;
  grid-column-gap: 2vmax;

  grid-template-areas: "pic title"
                       "pic desc"
                       "pic date";

  ${mediaSize.tablet`
    width: 85%;
    height: auto;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10%;
    grid-template-columns: 90%;
    grid-template-rows: 25vh auto 10vh 5vh;
    grid-template-areas: "pic"
                         "title"
                         "desc"
                         "date";
    padding: 0 5% 0 5%;
  `}

`;

const PostTitle = styled.span`
  font-family: "PT Serif", serif;;
  font-size: 6vmin;
  grid-area: title;
  align-self: center;
  margin-bottom: 0.25em;
  line-height: 1;

  ${mediaSize.tablet`
    align-self: left;
    font-size: 4vh;
    margin-top: 0.5em;
  `}

  ${mediaSize.phone`
    font-size: 4.5vh;
  `}
`;

const Highlight = styled.span`
  position: relative;
  z-index: 1;

  &:before { /* background of title on hover */
    background-color: ${props => props.color};
    opacity: 0.6;
    content: ' ';
    position: absolute;
    top: 0.45em;
    left: 0.25em;
    height: 0.9em;
    right: 0;
    bottom: 0;
    width: 0;
    z-index: -1;

    transition: 250ms ease width;

    ${props => props.hovered ? css`width: 95%;` : null}
  }
`

const PostImg = styled(Img)`
  grid-area: pic;
  justify-self: center;
  align-self: center;

  max-width: ${props => props.size.width};
  max-height: ${props => props.size.height};

  filter: grayscale(100%);
  transition: 1s filter;

  ${props => props.focused ? css`filter: none;` : null}

  ${mediaSize.tablet`
    justify-self: start;
    align-self: center;
    width: auto;
    max-width: 100%;
  `}

  ${mediaSize.phone`
    align-self: center;
    width: auto;
    max-width: 100%;
  `}
`

const PostDesc = styled.span`
  grid-area: desc;
  font-family: "Raleway", serif;

  font-size: 2.2vmin;
  padding-right: 1vmin;

  ${mediaSize.tablet`
    justify-self: center;
    align-self: center;
    font-size: 2vmax;
  `}


`;

const PostDate = styled.div`
  grid-area: date;
  align-self: center;
  font-size: 2vmin;

  ${mediaSize.tablet`
    font-size: 3vmin;
  `}
`

const PostLink = styled.a`
  text-decoration: inherit;
  color: inherit;
`

class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
    };
  }

  handleFocus(focused) {
    this.setState({focused: focused});
  }

  render() {
    return (
      <VisibilitySensor onChange={(isVisible) => this.handleFocus(isMobile && isVisible)}>
        <PostLink href={this.props.articleSrc} target="_blank">
          <Container
            initialPose='enter' pose={this.state.focused ? 'hovered' : 'normal'}
            onMouseEnter={() => this.handleFocus(true)}
            onMouseLeave={() => this.handleFocus(false)}>
            <PostTitle>
              <Highlight color={this.props.color} hovered={this.state.focused}>
                {this.props.title}
              </Highlight>
            </PostTitle>
            <PostDesc>
              {this.props.subtitle} ...
            </PostDesc>
            <PostDate>
              {(new Date(this.props.createdAt)).toDateString().substr((new Date(this.props.createdAt)).toDateString().indexOf(" ") + 1)}
            </PostDate>
            <PostImg
              src={this.props.imgSrc}
              alt={this.props.imgAlt}
              size={this.props.imgSize}
              focused={this.state.focused}/>
          </Container>
        </PostLink>
      </VisibilitySensor>
    );
  }
}


export default BlogPost;
