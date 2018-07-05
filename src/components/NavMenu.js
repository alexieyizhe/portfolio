import React from "react";
import styled from "styled-components";
import Link from "gatsby-link";
import posed from "react-pose";
import { isMobile } from 'react-device-detect';

import { menuPageOptions, contactOptions, mediaSize } from "../data/configOptions.js";


const MenuButton = posed.div({
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
});

const MenuLink = posed.div({
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
});

const MenuLinkBg = posed.div({
  closed: {
    width: 0,
  },
  hovered: {
    width: ({length}) => length * 8
  },
});

const Menu = styled(MenuButton)`
  width: 2.5em;
  height: 2.5em;
  background-color: #56C6DF;
  opacity: 0.8;
  position: fixed;
  right: 11%;
  display: inline-block;
  z-index: 100; // Allow menu to always be on top for navigation

  outline: 2px solid #fff;
  outline-offset: -0.7em;


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

const NavLink = styled(MenuLink)`
  font-family: "Raleway", sans-serif;
  font-weight: bold;
  text-decoration: none;
  text-align: justify;
  direction: rtl;
  padding-top: 0.5em;
  float: right;

  &:first-child {
    margin-top: 2.5em;
  }

  .navLinkText {
    text-decoration: none;
    color: #545454;
  }

  ${props => props.default ? null :
    mediaSize.phone`
    direction: ltr;
    float: none;
    position: relative;
    top: ${props => props.mobileoffset * -50}px;

    &:first-child {
      margin-top: -2.5em;
    }
  `}
`;

const NavLinkBg = styled(MenuLinkBg)`
  background-color: ${props => props.colour};
  opacity: 0.6;
  position: absolute;
  float: right;
  margin-top: 0.45em;
  height: 0.9em;
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
          { menuPageOptions.map((option, i) => {
              return <NavLink key={i} pose={this.state.menuOpen ? 'open' : 'closed'} default={this.props.showDefault} mobileoffset={i} >
                       <Link
                         to={option.route}
                         className="navLinkText"
                         onMouseEnter={() => this.setState({ menuLink: option.text })}
                         onMouseLeave={() => this.setState({ menuLink: null })} >
                         <NavLinkBg
                           initialPose = 'closed'
                           pose={((this.state.menuLink === option.text || isMobile) && this.state.menuOpen) ? 'hovered' : 'closed'}
                           colour={option.colour}
                           length={option.text.length} />
                         <div style={{ position: 'relative', paddingRight: '5px', opacity: '1'}}>{option.text}</div>
                       </Link>
                     </NavLink>;
           })}
      </Menu>
    );
  }
}

export default NavMenu;
