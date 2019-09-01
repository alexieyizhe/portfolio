import React from "react";

import copy from "~assets/copy.json";
import Card from "~components/Card";
import ContentCard from "~components/ContentCard";
import ElementGroup from "../../components/ElementGroup";

import TESTIMG from "~assets/images/spookyscary.jpg";

const CardSection = () => (
  <ElementGroup
    title={copy.designSystemSection.sections.card.title}
    desc={copy.designSystemSection.sections.card.desc}
  >
    <div>
      <Card />
    </div>
    <div>
      <ContentCard
        title="This is a card"
        linkText="Here's a link"
        linkHref="/"
        imgSrc={TESTIMG}
      >
        This is some body text.
      </ContentCard>
    </div>
    <div>
      <ContentCard title="No body card" linkText="Here's a link" linkHref="/" />
    </div>
    <div>
      <ContentCard title="No link card">This is some body text.</ContentCard>
    </div>
    <div>
      <ContentCard linkText="Here's a link" linkHref="/">
        This card has no title.
      </ContentCard>
    </div>
  </ElementGroup>
);

export default CardSection;
