import React from "react";
import styled from "styled-components";
import posed from "react-pose";

import TemplateWrapper from "../components/TemplateWrapper.js";
import PageHeader from "../components/PageHeader.js";
import ProjectShowcase from "../components/ProjectShowcase.js";
import { projectsList } from "../data/projectData.js";


class ProjectsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TemplateWrapper header="featured work." menu footer outerBounds={{ top: '7%', left: '15%', right: '15%', bottom: '0' }} title="Projects">
        {projectsList.map((project, i) => {
          return <ProjectShowcase key={i} project={project} layout={i % 2 ? "left" : "right"} />
        })}
      </TemplateWrapper>
    );
  }
}


export default ProjectsPage;
