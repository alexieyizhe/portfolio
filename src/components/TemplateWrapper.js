import React from "react";
import styled from "styled-components";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import PageFooter from "./PageFooter.js";
import PageHeader from "./PageHeader.js";
import NavMenu from "./NavMenu.js";
import Logo from "../../logo.png";

// Global styles go here!
const TemplateContainer = styled.div`
  font-family: "SF UI Display";
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
      showFooter: props.footer
    }
  }

  render() {
    return (
      <TemplateContainer outerBounds={this.props.outerBounds}>
        <Helmet
          title="Alex Xie"
          meta={[
            { name: `description`, content: `The personal website/portfolio of Alex Xie, a computer science student at the University of Waterloo.` },
            { name: `keywords`, content: `Alex, Yizhe, Xie, alexieyizhe, website, portfolio, university, waterloo, projects, work, experience, resume, contact` },
          ]}
          links={[
            { rel:'icon', type: 'image/png', sizes:'16x16', href:{Logo} }
          ]}
        />
        {/* TODO: get favicon working! */}
        <div>
          {this.state.showHeader ? <PageHeader className="navMenu" title={this.state.showHeader} /> : null}
          {this.state.showMenu || this.state.showDefaultMenu ? <NavMenu showDefault={this.state.showDefaultMenu} /> : null}
        </div>
        {this.props.children}
        {this.state.showFooter ? <PageFooter className="pageFooter" /> : null}
      </TemplateContainer>
    )
  }
}

export default TemplateWrapper;
