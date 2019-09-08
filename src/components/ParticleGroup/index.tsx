/**
 * Provides a handy group of particles.
 */

import React from "react";
import styled from "styled-components";

import Particle, { ParticleInfo } from "../Particle";
import { BaseElementProps } from "~src/types/BaseElementProps";

export interface ParticleGroupProps extends BaseElementProps {
  particlesInfo?: ParticleInfo[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customParticle?: any;
}

const defaultParticlesInfo: ParticleInfo[] = [
  { x: 0, y: 0, s: 1, color: "black" },
];

const ParticlesContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

const ParticleContainer = styled.div<ParticleInfo>`
  position: absolute;
  display: inline-block;
  left: ${({ x }) => x + (Math.random() * 4 - 2)}%;
  top: ${({ y }) => y + (Math.random() * 4 - 2)}%;
  transform: scale(${({ s }) => s + (Math.random() - 0.5) / 3});
`;

const ParticleGroup: React.FC<ParticleGroupProps> = ({
  particlesInfo = defaultParticlesInfo,
  customParticle,
}) => (
  <ParticlesContainer>
    {particlesInfo.map(particlePos => (
      <ParticleContainer
        key={`${particlePos.x}-${particlePos.y}`}
        x={particlePos.x}
        y={particlePos.y}
        s={particlePos.s}
        color={particlePos.color}
      >
        <Particle
          float
          color={particlePos.color}
          customSVG={Math.random() < 0.7 ? customParticle : undefined}
        />
      </ParticleContainer>
    ))}
  </ParticlesContainer>
);

export default ParticleGroup;
