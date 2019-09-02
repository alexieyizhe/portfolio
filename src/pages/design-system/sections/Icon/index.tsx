import React from "react";

import copy from "~assets/copy.json";

import ElementGroup from "../../components/ElementGroup";
import Icon from "~components/Icon";
import { Size } from "~src/theme";

const IconSection = () => (
  <ElementGroup
    title={copy.designSystemSection.sections.icon.title}
    desc={copy.designSystemSection.sections.icon.desc}
  >
    <Icon name="download" />
    <Icon name="github" color="pink" />
    <Icon name="github" size={Size.LARGE} />
    <Icon name="x" size={Size.LARGE} />
  </ElementGroup>
);

export default IconSection;
