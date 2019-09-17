import React from "react";
import styled from "styled-components";
import { animated } from "react-spring";

import copy from "~assets/copy";
import { BaseElementProps } from "~types/BaseElementProps";

import IconLink from "./IconLink";

const Container = styled(animated.div)`
  position: absolute;
  bottom: 10vh;

  ${({ theme }) => theme.mediaQueries.largeMobile`
    position: relative;
    bottom: unset;
    margin-top: 20px;
  `}
`;

const QuickLinks: React.FC<BaseElementProps> = props => (
  <Container {...props}>
    <IconLink
      iconName="file-text"
      color="purple"
      to={copy.mainLandingSection.links.resume}
      size={36}
      mobileSize={30}
    >
      resume
    </IconLink>

    <IconLink
      iconName="github"
      color="blue"
      to={copy.mainLandingSection.links.github}
      size={36}
      mobileSize={30}
    >
      github
    </IconLink>

    <IconLink
      iconName="send"
      color="green"
      to={copy.mainLandingSection.links.mail}
      size={36}
      mobileSize={30}
    >
      email
    </IconLink>
  </Container>
);

export default QuickLinks;
