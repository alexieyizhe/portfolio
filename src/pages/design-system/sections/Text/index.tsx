import React from "react";

import copy from "~assets/copy.json";

import Text from "~components/Text";
import ElementGroup from "../../components/ElementGroup";
import { Size } from "~src/theme";

const TextSection = () => (
  <ElementGroup
    title={copy.designSystemSection.sections.text.title}
    desc={copy.designSystemSection.sections.text.desc}
  >
    <Text variant="heading">A Heading</Text>
    <Text variant="subheading">A Subheading</Text>
    <Text variant="body">Some body text</Text>
    <Text bold color="red" size={Size.XSMALL} as="span">
      Bold,
    </Text>{" "}
    <Text italic size={Size.XLARGE} as="span">
      Italic,
    </Text>{" "}
    <Text underline color="purple" as="span">
      Underline
    </Text>
    ,{" "}
    <Text underline bold italic as="span">
      or all 3!
    </Text>
  </ElementGroup>
);

export default TextSection;
