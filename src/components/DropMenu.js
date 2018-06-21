import React from "react";
import styled from "styled-components";
import Link from "gatsby-link";

import {menuPageOptions} from "../data/navigation.js";

const MenuButton = styled.div`
  width: 3em;
  height: 3em;
  background-color: #56C6DF;
  opacity: 0.8;
  transform: rotate(45deg);
  text-align: justify;
  direction: rtl;

  position: fixed;
  top: 5%;
  right: 5%;
  transition: transform 0.5s, height 1s;
  overflow: hidden;

  &:hover {
    cursor: pointer;
    transform: rotate(0deg);
    min-height: 3em;
    height: ${menuPageOptions.length * 1.5 + 3}em;
    overflow: visible;
  }
`

const NavLink = styled.div`
  opacity: 1;
  color: white;
  text-decoration: none;
  margin-bottom: 0.5em;

  &:first-child {
    margin-top: 3.5em;
  }

  &:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    border-bottom: 3px solid;
    opacity: 0;
    width: 0;
    transition: width .5s ease, opacity .5s ease;
  }

  &:hover:after, &.selected:after {
    width: 75%;
    opacity: 1;
  }

  .navLinkText {
    text-decoration: none;
    color: #545454;
  }
`;

class DropMenu extends React.Component {
  render() {
    return (
      <MenuButton>
          {
            menuPageOptions.map((option, i) => {
              return <NavLink key={i}><Link to={option.route} className="navLinkText">{option.text}</Link></NavLink>
            })
          }
      </MenuButton>
    );
  }
}

export default DropMenu;
