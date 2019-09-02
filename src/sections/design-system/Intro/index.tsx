import React from "react";

import copy from "~assets/copy";

import ElementGroup from "~sections/design-system/components/ElementGroup";

const IntroSection = () => (
  <ElementGroup
    title={copy.designSystemSection.sections.intro.title}
    desc={copy.designSystemSection.sections.intro.desc}
  />
);

export default IntroSection;
