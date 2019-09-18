import React from "react";
import styled from "styled-components";

import { Text } from "~components/index";
import ContentCard from "./components/ContentCard";

import copy from "~assets/copy";

const sectionCopy = copy.featuredSection;

const Container = styled.div`
  position: relative;
  margin-top: 100px;

  display: flex;
  justify-content: space-between;

  ${({ theme }) => theme.mediaQueries.tablet`
    flex-direction: column;

    & > .heading-column {
      order: -1;
    }
  `}
`;

const Column = styled.div`
  position: relative;
  width: 400px;
  max-width: 28%;

  &:nth-child(3) {
    margin-top: 25px;
  }

  ${({ theme }) => theme.mediaQueries.tablet`
    width: 100%;
    max-width: 100%;

    margin-bottom: 50px;

    &:nth-child(3) {
      margin-top: 0;
    }
  `}
`;

const HeaderText = styled(Text)`
  margin: 30px 0;
`;

const FeaturedCard = styled(ContentCard)`
  position: relative;
  width: 100%;
`;

const BodyText = styled(Text)`
  margin-bottom: 10px;
`;

const Featured = () => (
  <Container>
    <Column>
      <FeaturedCard
        title={sectionCopy.cards.first.title}
        linkHref={sectionCopy.cards.first.linkHref}
        linkText={sectionCopy.cards.first.linkText}
        imgSrc={sectionCopy.cards.first.imgSrc}
        imgAlt={sectionCopy.cards.first.imgAlt}
      >
        {sectionCopy.cards.first.desc.map((paragraph, i) => (
          <BodyText variant="body" key={`${paragraph}-${i}`}>
            {paragraph}
          </BodyText>
        ))}
      </FeaturedCard>
    </Column>

    <Column className="heading-column">
      <HeaderText variant="heading">{sectionCopy.heading}</HeaderText>
      <FeaturedCard
        title={sectionCopy.cards.second.title}
        linkHref={sectionCopy.cards.second.linkHref}
        linkText={sectionCopy.cards.second.linkText}
      >
        {sectionCopy.cards.second.desc.map((paragraph, i) => (
          <BodyText variant="body" key={`${paragraph}-${i}`}>
            {paragraph}
          </BodyText>
        ))}
      </FeaturedCard>
    </Column>

    <Column>
      <FeaturedCard
        title={sectionCopy.cards.third.title}
        linkHref={sectionCopy.cards.third.linkHref}
        linkText={sectionCopy.cards.third.linkText}
      >
        {sectionCopy.cards.third.desc.map((paragraph, i) => (
          <BodyText variant="body" key={`${paragraph}-${i}`}>
            {paragraph}
          </BodyText>
        ))}
      </FeaturedCard>
    </Column>
  </Container>
);

export default Featured;
