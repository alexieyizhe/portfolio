import React from "react";
import styled from "styled-components";

import { Text } from "~src/components";
import ShowcaseCard from "./components/ShowcaseCard";

import copy from "~assets/copy";

const sectionCopy = copy.showcaseSection;

const Container = styled.div`
  position: relative;
  margin-top: 250px;
`;

const HeaderText = styled(Text)`
  margin: 30px 0;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 10vh;
  margin-bottom: 40vh;

  &:last-child {
    margin-bottom: 50px;
  }
`;

const Showcase = () => (
  <Container>
    <HeaderText variant="heading">{sectionCopy.title}</HeaderText>
    {sectionCopy.cards.map(card => (
      <CardContainer key={card.title}>
        <ShowcaseCard
          title={card.title}
          subtitle={card.subtitle}
          imgSrc={card.imgSrc}
          imgAlt={card.imgAlt}
          linkHref={card.linkHref}
          linkText={card.linkText}
          particles
          customParticle={card.customParticle}
        />
      </CardContainer>
    ))}
  </Container>
);

export default Showcase;
