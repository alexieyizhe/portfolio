import React from "react";

import copy from "~assets/copy.json";

import ElementGroup from "../../components/ElementGroup";

const IntroSection = () => (
  <ElementGroup
    title={copy.designSystemSection.sections.intro.title}
    desc={copy.designSystemSection.sections.intro.desc}
  />
);

export default IntroSection;
