import React from "react";

import copy from "~assets/copy";

import Text from "~components/Text";
import ElementGroup from "~sections/design-system/components/ElementGroup";

const TypefaceSection = () => (
  <ElementGroup
    title={copy.designSystemSection.sections.typeface.title}
    desc={copy.designSystemSection.sections.typeface.desc}
  >
    <Text variant="heading">Typeface</Text>
    <Text variant="body">ABCDEFGHIJKLMNOPQRSTUVWXYZ !?#()[]</Text>
    <Text variant="body">abcdefghijklmnopqrstuvwxyz 1234567890</Text>
  </ElementGroup>
);

export default TypefaceSection;
