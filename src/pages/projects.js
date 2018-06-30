import React from "react";
import styled from "styled-components";
import posed from "react-pose";

import TemplateWrapper from "../components/TemplateWrapper.js";
import PageHeader from "../components/PageHeader.js";
import ProjectShowcase from "../components/ProjectShowcase.js";
import { projectsList } from "../data/configOptions.js";

const ResumeBox = styled.div`
  width: 100%;
  text-align: center;

  & * {
    display: inline-block;
  }

  & canvas {
    margin-top: 1em;
  }

  & .react-pdf__Page {
    &:before {
      /* Position the pseudo-element. */
      content: ' ';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;

      /* Create the box shadow at expanded size. */
      box-shadow: 0 10px 50px 0 rgba(0, 0, 0, 0.5);

      /* Hidden by default. */
      opacity: 0;
      transition: opacity 500ms;
    }

    &:hover:before {
      opacity: 1;
    }
  }
`;


class ProjectsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TemplateWrapper menu footer outerBounds={{ top: '7%', left: '15%', right: '15%', bottom: '0' }}>
        <PageHeader>Featured Works</PageHeader>
        <div id="centerDiv">
          <ProjectShowcase project={projectsList[0]} picRight />
          <ProjectShowcase project={projectsList[0]} picLeft />
          <ProjectShowcase project={projectsList[0]} picRight />
        </div>
      </TemplateWrapper>
    );
  }
}


export default ProjectsPage;
