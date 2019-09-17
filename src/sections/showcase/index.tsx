import React from "react";
import styled from "styled-components";

import { Text } from "~src/components";
import ShowcaseCard from "./components/ShowcaseCard";

import copy from "~assets/copy";

const sectionCopy = copy.showcaseSection;

const showcaseCardParticleInfo: ParticleInfo[][] = [
  [
    { x: 60, y: 94, s: 0.8, color: "red" },
    { x: 23, y: 96, s: 0.4, color: "blue" },
    { x: -2, y: 28, s: 0.5, color: "purple" },
    { x: 98, y: 60, s: 0.6, color: "green" },
    { x: 45, y: -2, s: 0.75, color: "red" },
  ],
  [
    { x: -1, y: 84, s: 0.8, color: "red" },
    { x: 43, y: 96, s: 0.4, color: "blue" },
    { x: 99, y: 1, s: 0.5, color: "purple" },
    { x: 98, y: 60, s: 0.6, color: "green" },
    { x: 25, y: -4, s: 0.75, color: "green" },
  ],
  [
    { x: 60, y: 94, s: 0.8, color: "purple" },
    { x: 8, y: 96, s: 0.4, color: "blue" },
    { x: -2, y: 23, s: 0.5, color: "purple" },
    { x: 98, y: 60, s: 0.6, color: "green" },
    { x: 45, y: -2, s: 0.75, color: "red" },
  ],
];

const Container = styled.div`
  position: relative;
  min-height: 65vh;
`;

const HeaderText = styled(Text)`
  margin: 30px 0;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 40px;
  margin-bottom: 175px;

  &:last-child {
    margin-bottom: 50px;
  }
`;

const Showcase = () => (
  <Container>
    <HeaderText variant="heading">{sectionCopy.title}</HeaderText>
    {sectionCopy.cards.map((card, i) => (
      <CardContainer key={card.title}>
        <ShowcaseCard
          title={card.title}
          subtitle={card.subtitle}
          imgSrc={card.imgSrc}
          imgAlt={card.imgAlt}
          color={card.color}
          linkHref={card.linkHref}
          linkText={card.linkText}
          particles
          customParticle={card.customParticle}
          particlesInfo={
            showcaseCardParticleInfo[i % showcaseCardParticleInfo.length]
          }
        />
      </CardContainer>
    ))}
  </Container>
);

export default Showcase;
