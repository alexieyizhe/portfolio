import React from "react";
import styled from "styled-components";

import { BaseElementProps } from "~utils/types/BaseElementProps";

import Particle from "~components/Particle";

export interface CardProps extends BaseElementProps {
  particles?: boolean;
  particlesInfo?: ParticleInfo[];
}

export interface ParticleInfo {
  x: number;
  y: number;
  s: number;
  color: string;
}

export const CARD_HORIZ_PADDING = 30;
export const CARD_VERT_PADDING = 20;

/**
 * Determines the positions of `n` particles such that they reside on the edge of the card,
 * spaced far enough from each other to not look awkward.
 */
export const placeParticlesOnEdge = () => {};

const Container = styled.div`
  position: relative;

  width: 200px;
  height: 120px;
  padding: ${CARD_VERT_PADDING}px ${CARD_HORIZ_PADDING}px;

  border-radius: ${({ theme }) => theme.borderRadius.card}px;
  box-shadow: ${({ theme }) => theme.boxShadow.main};
`;

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
  left: ${({ x }) => x}%;
  top: ${({ y }) => y}%;
  transform: scale(${({ s }) => s});
`;

const Card: React.FC<CardProps> = ({
  particles,
  particlesInfo,
  children,
  ...rest
}) => (
  <div>
    {particles && particlesInfo && (
      <ParticlesContainer>
        {particlesInfo.map(particlePos => (
          <ParticleContainer
            key={`${particlePos.x}-${particlePos.y}`}
            x={particlePos.x}
            y={particlePos.y}
            s={particlePos.s}
            color={particlePos.color}
          >
            <Particle float color={particlePos.color} />
          </ParticleContainer>
        ))}
      </ParticlesContainer>
    )}
    <Container {...rest}>{children}</Container>
  </div>
);

export default Card;
