import React from "react";
import styled from "styled-components";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import PageFooter from "./PageFooter.js";
import PageHeader from "./PageHeader.js";
import NavMenu from "./NavMenu.js";
import Favicon from "../img/misc/logo_square.png";
import Transition from "./Transition.js";

// Global styles go here!
const TemplateContainer = styled.div`
  font-family: "SF UI Display", sans-serif;
  color: #464646;
  position: absolute;
  top: ${props => props.outerBounds && props.outerBounds.top || 0};
  left: ${props => props.outerBounds && props.outerBounds.left || 0};
  right: ${props => props.outerBounds && props.outerBounds.right || 0};
  bottom: ${props => props.outerBounds && props.outerBounds.bottom || 0};
`;

class TemplateWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: props.menu,
      showDefaultMenu: props.defaultMenu,
      showHeader: props.header,
      showFooter: props.footer,
      title: props.title,
    }
  }

  render() {
    return (
      <TemplateContainer outerBounds={this.props.outerBounds}>
        <Helmet>
          <title>{this.state.title}</title>
          <meta name="description" content="Personal website/portfolio of Alex Xie, a computer science student at the University of Waterloo." />
          <meta name="keywords" content="Alex, Yizhe, Xie, alexieyizhe, website, portfolio, university, waterloo, projects, work, experience, resume, contact, gatsby, react, developer" />
          <link rel="icon" href={Favicon} sizes={["16x16","32x32","64x64"]} type="image/png" />
        </Helmet>
        <Transition>
          <div>
            {this.state.showHeader ? <PageHeader className="navMenu" title={this.state.showHeader} /> : null}
            {this.state.showMenu || this.state.showDefaultMenu ? <NavMenu showDefault={this.state.showDefaultMenu} /> : null}
          </div>
          {this.props.children}
          {this.state.showFooter ? <PageFooter className="pageFooter" /> : null}
        </Transition>
      </TemplateContainer>
    )
  }
}

export default TemplateWrapper;
