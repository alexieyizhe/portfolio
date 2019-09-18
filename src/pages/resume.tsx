import React, { useState, useCallback } from "react";
import styled from "styled-components";

import PageWrapper from "~components/PageWrapper";
import {
  Card,
  HomeButtonMarkup,
  Button,
  UnstyledButton,
} from "~src/components";

import copy from "~assets/copy";

const pageCopy = copy.resumePage;

const DividedPageContainer = styled(PageWrapper)`
  display: grid;
  grid-template-areas:
    "subheading   content"
    "heading      content"
    "side-content content";
  grid-template-rows: auto auto 1fr;
  grid-template-columns: 40% 45%;
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

  ${({ theme }) => theme.mediaQueries.tablet`
    grid-template-areas:
    "subheading"
    "heading"
    "content"
    "side-content";
    grid-template-rows: auto auto auto auto;
    grid-template-columns: 100%;
  `}
`;

const ActionButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;

  & > *:first-child {
    margin-right: 10px;
  }

  ${({ theme }) => theme.mediaQueries.tablet`
    position: relative;
    margin: -45vh -20px 0 -20px;
    justify-content: space-between;
  `}

  ${({ theme }) => theme.mediaQueries.tablet`
    position: relative;
    margin: 20px 20px 0 20px;
    justify-content: space-between;
  `}
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

  display: grid;
  justify-content: center;
  align-items: center;

  & > * {
    grid-row: 1;
    grid-column: 1;
  }

  & img {
    max-width: 100%;
  }
`;

const ResumeButton = styled(UnstyledButton)<{ show: boolean }>`
  transition: opacity 150ms ease-in;
  opacity: ${({ show }) => (show ? 1 : 0)};
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
      heading={copy.resumePage.heading} // TODO: figure out how to add a star icon for Current
      subheading={copy.resumePage.resumes[displayedResume].name}
      sideButton={HomeButtonMarkup}
    >
      <ResumeCard className="content-container">
        {pageCopy.resumes.map(({ img }, i) => (
          <ResumeButton
            key={img}
            onClick={viewResumePDF}
            show={displayedResume === i}
          >
            <img src={img} />
          </ResumeButton>
        ))}
      </ResumeCard>

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
    </DividedPageContainer>
  );
};

export default ResumePage;
