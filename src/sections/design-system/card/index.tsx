import React from "react";
import styled from "styled-components";

import Card from "~components/Card";
import ContentCard from "~sections/featured/components/ContentCard";
import ShowcaseCard from "~sections/showcase/components/ShowcaseCard";
import ElementGroup from "~sections/design-system/components/ElementGroup";

import copy from "~assets/copy";
import { EquithonShowcaseImg, FlippCoverPhoto } from "~assets/images";

const CardDisplay = styled.div`
  margin-bottom: 30px;
`;

const CardSection = () => (
  <ElementGroup
    title={copy.designSystemSection.sections.card.title}
    desc={copy.designSystemSection.sections.card.desc}
  >
    <CardDisplay>
      <Card />
    </CardDisplay>

    <CardDisplay>
      <ContentCard
        title="This is a card"
        linkText="Here's a link"
        linkHref="/"
        imgSrc={FlippCoverPhoto}
      >
        This is some body text.
      </ContentCard>
    </CardDisplay>

    <CardDisplay>
      <ContentCard title="No body card" linkText="Here's a link" linkHref="/" />
    </CardDisplay>

    <CardDisplay>
      <ContentCard title="No link card">This is some body text.</ContentCard>
    </CardDisplay>

    <CardDisplay>
      <ContentCard linkText="Here's a link" linkHref="/">
        This card has no title.
      </ContentCard>
    </CardDisplay>

    <CardDisplay>
      <ShowcaseCard
        title="Building Canada's largest hackathon."
        subtitle="Hack de nort"
        linkText="Read more"
        linkHref=""
        imgSrc={EquithonShowcaseImg}
        imgAlt="Some pic"
        particles
      />
    </CardDisplay>
  </ElementGroup>
);

export default CardSection;
