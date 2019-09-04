import React from "react";
import styled from "styled-components";

import { Text, ShowcaseCard } from "~src/components";
import copy from "~assets/copy";

const sectionCopy = copy.showcaseSection;

const Container = styled.div`
  position: relative;
  margin-top: 50px;
`;

const HeaderText = styled(Text)`
  margin: 30px 0;
`;

const Showcase = () => (
  <Container>
    <HeaderText variant="heading">{sectionCopy.title}</HeaderText>
    {sectionCopy.cards.map(card => (
      <ShowcaseCard
        key={card.title}
        title={card.title}
        subtitle={card.subtitle}
        imgSrc={card.imgSrc}
        imgAlt={card.imgAlt}
        linkHref={card.linkHref}
        linkText={card.linkText}
      />
    ))}
  </Container>
);

export default Showcase;
