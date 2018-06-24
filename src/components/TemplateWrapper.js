import React from "react";
import styled from "styled-components";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import Footer from "./Footer.js";
import DropMenu from "./DropMenu.js";

// Global styles go here!
const TemplateContainer = styled.div`
  font-family: "SF UI Display";
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
      <TemplateContainer>
        <Helmet
          title="Portfolio Site of Alex Yizhe Xie"
          meta={[
            { name: `description`, content: `The personal website/portfolio of Alex Xie, a computer science student at the University of Waterloo.` },
            { name: `keywords`, content: `Alex, Yizhe, Xie, alexieyizhe, website, portfolio, university, waterloo, projects, work, experience, resume, contact` },
          ]}
        />
        <div>
          {this.props.children}
        </div>
        {this.state.showMenu ? <DropMenu /> : null}
        {this.state.showFooter ? <Footer /> : null}
      </TemplateContainer>
    )
  }
}

export default TemplateWrapper;
