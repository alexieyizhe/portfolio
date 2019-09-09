import React, { useState, useCallback } from "react";
import styled from "styled-components";

import PageWrapper from "~components/PageWrapper";
import { Card, Button, UnstyledButton } from "~src/components";

import copy from "~assets/copy";

// const LETTER_PAGE_WIDTH_TO_HEIGHT_RATIO = 1.2941;
// const RESUME_WIDTH = 400;
// const RESUME_HEIGHT = RESUME_WIDTH * LETTER_PAGE_WIDTH_TO_HEIGHT_RATIO;

const DividedPageContainer = styled(PageWrapper)`
  display: grid;
  grid-template-areas:
    "subheading   content"
    "heading      content"
    "side-content content";
  grid-template-rows: auto auto 1fr;
  grid-template-columns: 50% 39%;
  grid-column-gap: 15%;

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

const ActionButtonContainer = styled.div`
  justify-content: flex-start;

  & > *:first-child {
    margin-right: 10px;
  }
`;

const ResumeCard = styled(Card)`
  position: relative;
  padding: 0;
  width: 100%;
  height: 100%;

  overflow: hidden;
  cursor: pointer;

  transition: transform 150ms ease-in;
  &:hover,
  &:focus,
  &:focus-within {
    transform: translateY(-5px);
  }

  & img {
    max-width: 100%;
  }
`;

const ResumePage = () => {
  const [displayedResume, setDisplayedResume] = useState(
    copy.resumePage.resumes.findIndex(resumes => resumes.current)
  );

  const viewPrevResume = useCallback(
    () => setDisplayedResume(Math.max(0, displayedResume - 1)),
    [displayedResume]
  );

  const viewNextResume = useCallback(
    () =>
      setDisplayedResume(
        Math.min(displayedResume + 1, copy.resumePage.resumes.length - 1)
      ),
    [displayedResume]
  );

  const viewResumePDF = useCallback(
    () => window.open(copy.resumePage.resumes[displayedResume].file),
    [displayedResume]
  );

  return (
    <DividedPageContainer
      title={copy.resumePage.title} // TODO: figure out how to add a star icon for Current
      subtitle={copy.resumePage.resumes[displayedResume].name}
      sideButton
      iconName="arrow-left"
      iconOnClick={() => {
        window.location.href = "/";
      }}
    >
      <ActionButtonContainer className="side-content-container">
        <Button
          name="chevron-left"
          onClick={viewPrevResume}
          disabled={displayedResume === 0}
        />
        <Button
          name="chevron-right"
          onClick={viewNextResume}
          disabled={displayedResume === copy.resumePage.resumes.length - 1}
        />
      </ActionButtonContainer>
      <ResumeCard className="content-container">
        <UnstyledButton onClick={viewResumePDF}>
          <img src={copy.resumePage.resumes[displayedResume].img} />
        </UnstyledButton>
      </ResumeCard>
    </DividedPageContainer>
  );
};

export default ResumePage;
