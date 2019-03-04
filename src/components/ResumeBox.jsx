import React from 'react';
import styled from 'styled-components';
import { mediaSize } from '../data/configOptions';

const ResumeContainer = styled.a`
  position: relative;
  width: 50%;
  display: inline-block;

  transform: translateY(0);

  transition: transform 500ms;

  &:hover {
    transform: translateY(-5px);
  }

  ${mediaSize.tablet`
    width: 90%;
  `} &:before {
    /* Position the pseudo-element. */
    content: ' ';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    /* Create the box shadow at expanded size. */
    box-shadow: 0 5px 30px 0 rgba(0, 0, 0, 0.2);
  }

  & img {
    max-width: 100%;
  }
`;

const ResumeBox = props => (
  <ResumeContainer href={props.downloadSource} target="_blank">
    <img src={props.previewSource} alt="Alex's resume" />
  </ResumeContainer>
);

export default ResumeBox;
