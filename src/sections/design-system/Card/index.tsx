import React from "react";
import styled from "styled-components";

import copy from "~assets/copy";
import Card from "~components/Card";
import ContentCard from "~components/ContentCard";
import ShowcaseCard from "~components/ShowcaseCard";
import ElementGroup from "~sections/design-system/components/ElementGroup";

import TESTIMG from "~assets/images/spookyscary.jpg";
import { TestShowcaseImage as TESTIMG_SHOWCASE } from "~assets/images";

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
        imgSrc={TESTIMG}
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

    <CardDisplay style={{ position: "relative", width: "180%" }}>
      <ShowcaseCard
        title="Building Canada's largest hackathon."
        subtitle="Hack de nort"
        linkText="Read more"
        linkHref=""
        imgSrc={TESTIMG_SHOWCASE}
        imgAlt="Some pic"
      />
    </CardDisplay>
  </ElementGroup>
);

export default CardSection;
