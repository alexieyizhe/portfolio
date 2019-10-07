import React from "react";
import styled from "styled-components";
import Particles, { IParticlesParams } from "react-particles-js";

import { PAGE_VERT_PADDING, PAGE_HORIZ_PADDING } from "~components/PageWrapper";
import { CircleParticle } from "~assets/images";

/* eslint-disable @typescript-eslint/camelcase */

const particlesConfig: IParticlesParams = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    line_linked: {
      enable: false,
    },
    move: {
      speed: 1,
      out_mode: "out",
    },
    shape: {
      type: "images",
      images: [
        {
          src: CircleParticle,
          height: 10,
          width: 10,
        },
      ],
    },
    color: {
      value: "#CCC",
    },
    size: {
      value: 10,
      random: true,
    },
  },
  retina_detect: false,
};

const ParticlesContainer = styled.div`
  position: absolute;
  top: -${PAGE_VERT_PADDING}vh;
  left: -${PAGE_HORIZ_PADDING - 5}vw;
  width: 100vw;
  height: ${120 + PAGE_VERT_PADDING}vh;

  opacity: 0.3;
  mask-image: linear-gradient(
    to top,
    transparent,
    black,
    black,
    black,
    black,
    transparent
  );
`;

const BackgroundParticles = () => (
  <ParticlesContainer>
    <Particles
      width="100vw"
      height={`${120 + PAGE_VERT_PADDING}vh`}
      params={particlesConfig}
    />
  </ParticlesContainer>
);

export default BackgroundParticles;
