import React from "react";
import styled from "styled-components";

import { BaseElementProps } from "~utils/types/BaseElementProps";

import Particle from "~components/Particle";

export interface CardProps extends BaseElementProps {
  particles?: boolean;
  particlesInfo?: ParticleInfo[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customParticle?: any;
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

const OuterContainer = styled.div`
  position: relative;
  width: 100%;
`;

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
  left: ${({ x }) => x + (Math.random() * 4 - 2)}%;
  top: ${({ y }) => y + (Math.random() * 4 - 2)}%;
  transform: scale(${({ s }) => s + (Math.random() - 0.5) / 3});
`;

const Card: React.FC<CardProps> = ({
  id,
  className,
  particles,
  particlesInfo,
  customParticle,
  children,
  ...rest
}) => (
  <OuterContainer id={id} className={className}>
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
            <Particle
              float
              color={particlePos.color}
              customSVG={Math.random() < 0.7 ? customParticle : undefined}
            />
          </ParticleContainer>
        ))}
      </ParticlesContainer>
    )}
    <Container {...rest} className="Card--ContentContainer">
      {children}
    </Container>
  </OuterContainer>
);

export default Card;
