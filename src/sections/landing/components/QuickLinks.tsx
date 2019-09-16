import React from "react";
import styled from "styled-components";
import { animated } from "react-spring";

import copy from "~assets/copy";

import IconLink from "./IconLink";

const Container = styled(animated.div)`
  position: absolute;
  bottom: 10vh;

  ${({ theme }) => theme.mediaQueries.largeMobile`
    position: relative;
    bottom: unset;
    margin-top: 10px;
    
    transform-origin: center left;
    transform: scale(0.7);
  `}
`;

const QuickLinks: React.FC = props => (
  <Container {...props}>
    <IconLink
      iconName="file-text"
      color="purple"
      href={copy.mainLandingSection.links.resume}
      size={36}
    >
      resume
    </IconLink>

    <IconLink
      iconName="github"
      color="blue"
      href={copy.mainLandingSection.links.github}
      size={36}
    >
      github
    </IconLink>

    <IconLink
      iconName="send"
      color="green"
      href={copy.mainLandingSection.links.mail}
      size={36}
    >
      email
    </IconLink>
  </Container>
);

export default QuickLinks;
