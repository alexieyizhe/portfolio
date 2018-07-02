import React from "react";
import styled from "styled-components";
import { Page } from 'react-pdf';
import { Document } from 'react-pdf/dist/entry.webpack';
import { particleConfig } from "../data/configOptions.js";

import Particles from 'react-particles-js';
import TemplateWrapper from "../components/TemplateWrapper.js";
import Resume from "../../alex_xie_resume_2A.pdf";

const ParticlesStyle = {
  position: "fixed",
  width: "100%",
  height: "100%",
  zIndex: "-5"
}

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


class ResumePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="particleBgContainer">
        <Particles params={particleConfig} style={ParticlesStyle} />
        <TemplateWrapper menu footer outerBounds={{ top: '7%', left: '15%', right: '15%', bottom: '0' }} title="Resume" header="resume.">
          <ResumeBox>
            <a href={Resume} download="Alex Xie - Resume (2A)">
              <Document
                file={Resume}>
                <Page pageNumber={1} />
              </Document>
            </a>
          </ResumeBox>
        </TemplateWrapper>
      </div>
    );
  }
}


export default ResumePage;
