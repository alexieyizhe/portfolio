import React from "react";
import styled from "styled-components";
import posed from "react-pose";

import TemplateWrapper from "../components/TemplateWrapper.js";
import PageHeader from "../components/PageHeader.js";
import WorkShowcase from "../components/WorkShowcase.js";
import { experienceList } from "../data/experienceData.js";


class ProjectsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TemplateWrapper header="experience." menu footer outerBounds={{ top: '7%', left: '15%', right: '15%', bottom: '0' }}>
        <div id="centerDiv">
          {experienceList.map((work, i) => {
            return <WorkShowcase key={i} work={work} />
          })}
        </div>
      </TemplateWrapper>
    );
  }
}


export default ProjectsPage;
