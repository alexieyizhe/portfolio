import React from "react";
import styled from "styled-components";
import posed from "react-pose";
import { mediaSize } from "../data/configOptions.js";

import TemplateWrapper from "../components/TemplateWrapper.js";
import ProjectShowcase from "../components/ProjectShowcase.js";
import { projectsList } from "../data/projectData.js";


const ProjectGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat( auto-fit, minmax(275px, 1fr) );
  grid-gap: 3vmin;
  justify-items: center;

  ${mediaSize.tablet`
    grid-template-columns: repeat( auto-fit, minmax(250px, 1fr) );
  `}

  ${mediaSize.phone`
    grid-template-columns: repeat( auto-fit, minmax(150px, 1fr) );
  `}
`;

class ProjectsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TemplateWrapper header="featured work." menu footer curPage="Projects" outerBounds={{ top: '7%', left: '15%', right: '15%', bottom: '0' }} title="Projects">
        <ProjectGrid style={this.props.transition && this.props.transition.style}>
          {projectsList.map((project, i) => {
            return <ProjectShowcase key={i} project={project} />
          })}
        </ProjectGrid>
      </TemplateWrapper>
    );
  }
}


export default ProjectsPage;
