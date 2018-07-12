import React from "react";
import styled from "styled-components";
import Link from "gatsby-link";
import posed from "react-pose";
import { isMobile } from 'react-device-detect';
import { css } from "styled-components";
import Hamburger from 'react-hamburgers';
import hamburger from "../data/hamburgers/hamburgers.scss";
import { menuPageOptions, contactOptions, mediaSize } from "../data/configOptions.js";
import onClickOutside from "react-onclickoutside";

import HighlightText from "./HighlightText.js";


const MenuConfig = {
  enter: {
    scale: 0,
    rotate: 0
  },
  closed: {
    scale: 1,
    rotate: 45,
    afterChildren: true
  },
  open: {
    scale: 1.2,
    rotate: 0,
    delayChildren: 50,
    staggerChildren: 100,
  }
};

const MenuLinkConfig = {
  closed: {
    opacity: 0,
    scale: 0,
    x: -50,
    transition: {
      x: { delay: 50 }
    }
  },
  open: {
    opacity: 1,
    scale: 1,
    x: 0
  },
};

const Menu = styled(posed.div(MenuConfig))`
  width: 2.5em;
  height: 2.5em;
  background-color: #56C6DF;
  opacity: 1;
  position: fixed;
  right: 11%;
  display: inline-block;
  z-index: 100; // Allow menu to always be on top for navigation

  grid-area: menu;

  &:hover {
    cursor: pointer;
  }

  ${props => props.default ? null :
    mediaSize.phone`
    right: auto;
    bottom: 7%;
    left: 11%;
  `}
`

const MenuLink = styled(posed.div(MenuLinkConfig))`
  text-align: justify;
  direction: rtl;
  padding-top: 0.5em;
  float: right;

  &:nth-child(2) {
    margin-top: 0.3em;
  }

  & a {
    text-decoration: none;
  }

  ${props => props.default ?
    mediaSize.phone`
      padding-top: 0.25em;
    `
    :
    mediaSize.phone`
    direction: ltr;
    float: none;
    position: relative;
    top: ${props => props.mobileoffset * -50}px;

    &:nth-child(2) {
      margin-top: -4.5em;
    }
  `}
`;

const MenuLinkText = styled.div`
  padding-right: 5px;
  opacity: 1;
  font-family: "Raleway", sans-serif;
  font-weight: bold;
  color: #545454;

  ${mediaSize.phone`
    font-weight: 450;
  `}
`


class NavMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      menuLink: null
    };
  }

  handleClickOutside = evt => {
    this.handleFocus('clickAway')
  };

  handleFocus(action) {
    if(action === 'hover' && !isMobile) {
      this.setState({menuOpen: true});
      this.props.wrapperHandleFocus(true);
    } else if(action === 'hoverAway' && !isMobile) {
      this.setState({menuOpen: false});
      this.props.wrapperHandleFocus(false);
    } else if(action === 'click' && isMobile) {
      this.setState((prevState) => {
        this.props.wrapperHandleFocus(!prevState.menuOpen);
        return { menuOpen: !prevState.menuOpen };
      });
    } else if(action === 'clickAway' && isMobile) {
      this.setState({menuOpen: false});
      this.props.wrapperHandleFocus(false);
    }
  }

  render() {
    return (
      <Menu
        initialPose='enter'
        pose={this.state.menuOpen ? 'open' : 'closed'}
        onMouseEnter={() => this.handleFocus('hover')}
        onMouseLeave={() => this.handleFocus('hoverAway')}
        onClick={() => this.handleFocus('click')}
        default={this.props.showDefault}>
        <Hamburger
          active={this.state.menuOpen}
          type="elastic"
          style={{height: "1em", width: "1em"}}
        />
        { menuPageOptions.map((option, i) => {
            return (
              <MenuLink
                key={i}
                pose={this.state.menuOpen ? 'open' : 'closed'}
                default={this.props.showDefault}
                mobileoffset={i}
              >
                <Link
                  to={option.route}
                  onMouseEnter={() => this.setState({ menuLink: option.text })}
                  onMouseLeave={() => this.setState({ menuLink: null })}
                >
                  <MenuLinkText>
                    <HighlightText
                      color={option.colour}
                      hovered={((this.state.menuLink === option.text && !isMobile) || this.props.curPage === option.text) && this.state.menuOpen}
                    >
                      {option.text}
                    </HighlightText>
                  </MenuLinkText>
                </Link>
             </MenuLink>
            );})}
      </Menu>
    );
  }
}

export default onClickOutside(NavMenu);
