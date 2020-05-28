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
      <FeaturedCard {...sectionCopy.cards.first}>
        {sectionCopy.cards.first.desc.map((paragraph, i) => (
          <BodyText variant="body" key={`${paragraph}-${i}`}>
            {paragraph}
          </BodyText>
        ))}
      </FeaturedCard>
    </Column>

    <Column className="heading-column">
      <HeaderText variant="heading">{sectionCopy.heading}</HeaderText>
      <FeaturedCard {...sectionCopy.cards.second}>
        {sectionCopy.cards.second.desc.map((paragraph, i) => (
          <BodyText variant="body" key={`${paragraph}-${i}`}>
            {paragraph}
          </BodyText>
        ))}
      </FeaturedCard>
    </Column>

    <Column>
      <FeaturedCard {...sectionCopy.cards.third}>
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
