import React, { useState } from "react";
import styled from "styled-components";
import { Document, Page } from "react-pdf";

import PageWrapper from "~components/PageWrapper";
import { Card } from "~src/components";

import copy from "~assets/copy";
import resumePDF from "~assets/docs/resume.pdf";

const LETTER_PAGE_WIDTH_TO_HEIGHT_RATIO = 1.2941;
const RESUME_WIDTH = 400;
const RESUME_HEIGHT = RESUME_WIDTH * LETTER_PAGE_WIDTH_TO_HEIGHT_RATIO;

const DividedPageContainer = styled(PageWrapper)`
  display: grid;
  grid-template-areas:
    "subheading   content"
    "heading      content"
    "side-content content";
  grid-template-rows: 1em 1em auto;
  grid-template-columns: auto ${RESUME_WIDTH}px;

  position: relative;

  & > .PageWrapper--Subheading {
    grid-area: subheading;
  }

  & > .PageWrapper--Heading {
    grid-area: heading;
  }

  & > .side-content-container {
    grid-area: side-content;
  }

  & > .content-container {
    grid-area: content;
  }
`;

const ResumeCard = styled(Card)`
  position: relative;
  padding: 0;
  width: 100%;
  height: ${RESUME_HEIGHT}px;

  & .react-pdf__Document,
  & .react-pdf__Page {
    height: 100%;
  }
`;

const ResumePage = () => {
  const [displayedResume, setDisplayedResume] = useState(0);

  return (
    <DividedPageContainer
      title={copy.resumePage.title}
      subtitle={copy.resumePage.resumes[displayedResume].name}
    >
      <div className="side-content-container">hi</div>

      <ResumeCard className="content-container">
        <Document file={resumePDF}>
          <Page pageNumber={1} width={RESUME_WIDTH} />
        </Document>
      </ResumeCard>
    </DividedPageContainer>
  );
};

export default ResumePage;
