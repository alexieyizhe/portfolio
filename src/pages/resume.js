import React from "react";
import styled from "styled-components";
import { Page } from 'react-pdf';
import { Document } from 'react-pdf/dist/entry.webpack';

import TemplateWrapper from "../components/TemplateWrapper.js";
import Resume from "../../alex_xie_resume_2A.pdf";
import PageHeader from "../components/PageHeader.js";

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
      <TemplateWrapper menu footer outerBounds={{ top: '7%', left: '15%', right: '15%', bottom: '0' }}>
        <PageHeader>Resume</PageHeader>
        <ResumeBox>
          <a href={Resume} download="Alex Xie - Resume (2A)">
            <Document
              file={Resume}>
              <Page pageNumber={1} />
            </Document>
          </a>

        </ResumeBox>


      </TemplateWrapper>
    );
  }
}


export default ResumePage;
