import React from "react";
import styled from "styled-components";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import Footer from "./Footer.js";
import DropMenu from "./DropMenu.js";

// Global styles go here!
const TemplateContainer = styled.div`
  font-family: "SF UI Display";
  color: #464646;
  position: absolute;
  top: ${props => props.outerBounds.top || 0};
  left: ${props => props.outerBounds.left || 0};
  right: ${props => props.outerBounds.right || 0};
  bottom: ${props => props.outerBounds.bottom || 0};
`;

class TemplateWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: props.menu,
      showFooter: props.footer
    }
  }

  render() {
    return (
      <TemplateContainer outerBounds={this.props.outerBounds}>
        <Helmet
          title="Portfolio Site of Alex Yizhe Xie"
          meta={[
            { name: `description`, content: `The personal website/portfolio of Alex Xie, a computer science student at the University of Waterloo.` },
            { name: `keywords`, content: `Alex, Yizhe, Xie, alexieyizhe, website, portfolio, university, waterloo, projects, work, experience, resume, contact` },
          ]}
        />
        {this.state.showMenu ? <DropMenu className="navMenu"/> : null}
        {this.props.children}
        {this.state.showFooter ? <Footer className="pageFooter"/> : null}
      </TemplateContainer>
    )
  }
}

export default TemplateWrapper;
