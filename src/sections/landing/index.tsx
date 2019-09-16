import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { Waypoint } from "react-waypoint";
import { useSpring, animated, config } from "react-spring";

import { HeroMe } from "~assets/images";

import Intro from "./components/Intro";
import QuickLinks from "./components/QuickLinks";

const Container = styled(animated.div)`
  position: relative;
  height: 85vh;

  ${({ theme }) => theme.mediaQueries.tablet`
    height: 88vh;
  `}

  ${({ theme }) => theme.mediaQueries.largeMobile`
    height: 90vh;
  `}
`;

const HeroImg = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
  max-width: 70%;

  ${({ theme }) => theme.mediaQueries.tablet`
    bottom: 9vh;
    max-width: 90%;
  `}

  ${({ theme }) => theme.mediaQueries.largeMobile`
    bottom: 0;
    max-width: 100%;
  `}
`;

const Landing = () => {
  const [landingVisible, setLandingVisible] = useState(false);

  const onLandingEnter = useCallback(() => setLandingVisible(true), []);

  const entryAnimStyles = useSpring({
    opacity: landingVisible ? 1 : 0,
    transform: landingVisible ? "translateY(0)" : "translateY(100px)",
    config: config.stiff,
  });

  return (
    <Waypoint onEnter={onLandingEnter}>
      <Container>
        <Intro style={entryAnimStyles} />
        <QuickLinks style={entryAnimStyles} />
        <HeroImg src={HeroMe} />
      </Container>
    </Waypoint>
  );
};

export default Landing;
