import React from "react";

import copy from "~assets/copy.json";
import Card from "~components/Card";
import ElementGroup from "../../components/ElementGroup";

const CardSection = () => (
  <ElementGroup
    title={copy.designSystemSection.sections.card.title}
    desc={copy.designSystemSection.sections.card.desc}
  >
    <Card />
  </ElementGroup>
);

export default CardSection;
