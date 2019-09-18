import React from "react";
import styled from "styled-components";

import Particle from "~components/Particle";
import { Size } from "~types/Size";

const ParticleTop = styled(Particle)`
  position: absolute;
  top: 0;
  left: 25%;
`;

const ParticleLeft = styled(Particle)`
  position: absolute;
  bottom: 40px;
  left: 5%;
`;

const ParticleRight = styled(Particle)`
  position: absolute;
  bottom: 2px;
  right: 15%;
`;

const GalleryParticles: React.FC = () => (
  <>
    <ParticleTop float color="green" size={Size.SMALL} />
    <ParticleLeft float color="red" size={0.6} />
    <ParticleRight float color="blue" size={0.75} />
  </>
);

export default React.memo(GalleryParticles);
