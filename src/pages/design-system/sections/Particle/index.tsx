import React from "react";

import copy from "~assets/copy.json";

import ElementGroup from "../../components/ElementGroup";
import Particle from "~components/Particle";
import { Size } from "~src/theme";

const ParticleSection = () => (
  <ElementGroup
    title={copy.designSystemSection.sections.particle.title}
    desc={copy.designSystemSection.sections.particle.desc}
  >
    <Particle name="square" color="blue" float />
    <Particle name="zigzag" color="red" float />
    <Particle name="circle" color="purple" float />
    <Particle name="triangle" color="green" float />
    <Particle name="triangle" size={Size.XLARGE} float />
    <Particle name="square" size={Size.XSMALL} float />
  </ElementGroup>
);

export default ParticleSection;