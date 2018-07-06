import React from "react";
import styled from "styled-components";
import Link from "gatsby-link";
import posed from "react-pose";
import { isMobile } from 'react-device-detect';
import { css } from "styled-components";
import Hamburger from 'react-hamburgers';
import hamburger from "../data/hamburgers/hamburgers.scss";
import { menuPageOptions, contactOptions, mediaSize } from "../data/configOptions.js";


const MenuConfig = {
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
    font-family: "PT Sans", Arial, sans-serif;
    font-weight: 450;
  `}
`

const Highlight = styled.span`
  position: relative;
  z-index: 110;

  &:before { /* background of title on hover */
    background-color: ${props => props.color};
    opacity: 0.6;
    content: '';
    position: absolute;
    top: 0.25em;
    left: 0.25em;
    right: -5px;
    height: 1em;
    width: 0;
    z-index: -1;

    transition: 250ms ease width;

    ${props => props.hovered ? css`
      width: 95%;
      ${mediaSize.phone`
        width: 118%;
      `}
    ` : null}

    ${mediaSize.phone`
      top: 0.2em;
      float: none;
      top: 0;
      height: 1.1em;
      left: -3px;
      opacity: 0.75;
    `}
  }
`;


class NavMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      menuLink: null
    };
  }

  handleFocus(action) {
    if(action === 'hover' && !isMobile) {
      this.setState({menuOpen: true});
    } else if(action === 'hoverAway' && !isMobile) {
      this.setState({menuOpen: false});
    } else if(action === 'click' && isMobile) {
      this.setState((prevState) => {
        return { menuOpen: !prevState.menuOpen };
      });
    } else if(action === 'clickAway' && isMobile) {
      this.setState({menuOpen: false});
    }
  }

  render() {
    return (
      <Menu
        pose={this.state.menuOpen ? 'open' : 'closed'}
        onMouseEnter={() => this.handleFocus('hover')}
        onMouseLeave={() => this.handleFocus('hoverAway')}
        onClick={() => this.handleFocus('click')}
        onBlur={() => this.handleFocus('clickAway')}
        default={this.props.showDefault}
        tabIndex="0" >
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
                    <Highlight
                      color={option.colour}
                      hovered={((this.state.menuLink === option.text || isMobile) && this.state.menuOpen)}
                    >
                      {option.text}
                    </Highlight>
                  </MenuLinkText>
                </Link>
             </MenuLink>
            );})}
      </Menu>
    );
  }
}

export default NavMenu;
