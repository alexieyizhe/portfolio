import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { Waypoint } from "react-waypoint";
import { useSpring, animated, config } from "react-spring";

import { HeroMe } from "~assets/images";

import Intro from "./components/Intro";
import QuickLinks from "./components/QuickLinks";
import BackgroundParticles from "./components/BackgroundParticles";

const Container = styled(animated.div)`
  position: relative;
  height: 80vh;

  ${({ theme }) => theme.mediaQueries.tablet`
    height: 85vh;
  `}

  ${({ theme }) => theme.mediaQueries.xlMobile`
    height: 80vh;
  `}
`;

const HeroImg = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
  max-width: 70%;

  ${({ theme }) => theme.mediaQueries.tablet`
    bottom: 10vh;
    max-width: 90%;
  `}

  ${({ theme }) => theme.mediaQueries.largeMobile`
    bottom: 100px;
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
    <>
      <BackgroundParticles />
      <Waypoint onEnter={onLandingEnter} scrollableAncestor="window">
        <Container>
          <HeroImg src={HeroMe} />
          <Intro style={entryAnimStyles} />
          <QuickLinks style={entryAnimStyles} />
        </Container>
      </Waypoint>
    </>
  );
};

export default Landing;
