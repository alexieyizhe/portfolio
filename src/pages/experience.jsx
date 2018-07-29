import React from "react";
import styled from "styled-components";
import posed from "react-pose";

import TemplateWrapper from "../components/TemplateWrapper";
import PageHeader from "../components/PageHeader";
import WorkShowcase from "../components/WorkShowcase";
import { experienceList } from "../data/experienceData";

class ExperiencePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TemplateWrapper
        header="experience."
        menu
        footer
        curPage="Experience"
        outerBounds={{ top: "7%", left: "15%", right: "15%", bottom: "0" }}
        title="Experience"
      >
        <div style={this.props.transition && this.props.transition.style}>
          {experienceList.map((work, i) => {
            return <WorkShowcase key={i} work={work} />;
          })}
        </div>
      </TemplateWrapper>
    );
  }
}

export default ExperiencePage;
