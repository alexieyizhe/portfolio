import React from "react";
import styled from "styled-components";
import { Page } from 'react-pdf';
import { Document } from 'react-pdf/dist/entry.webpack';

import TemplateWrapper from "../components/TemplateWrapper.js";
import Resume from "../../alex_xie_resume_2A.pdf";

const ResumeBox = styled.span`

  margin-left: auto;
  margin-right: auto;
  width: 50%;

  &:hover {
    cursor: pointer;
    box-shadow: 0px 0px 53px 1px rgba(194,194,194,1);
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
        <ResumeBox>
          <Document
            file={Resume}>
            <Page pageNumber={1} />
          </Document>
        </ResumeBox>

      </TemplateWrapper>
    );
  }
}


export default ResumePage;
