import React from "react";

import copy from "~assets/copy.json";

import Text from "~components/Text";
import Link from "~components/Link";
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
    <Link variant="body" href="" color="blue">
      Chuck a colored link in there
    </Link>
    <Text bold color="red" size={Size.XSMALL} as="span">
      and baby,
    </Text>{" "}
    <Text italic size={Size.SMALL} as="span">
      you&apos;ve
    </Text>{" "}
    <Text underline color="purple" as="span">
      got a stew
    </Text>{" "}
    <Text underline bold italic as="span">
      goin&apos;!
    </Text>
  </ElementGroup>
);

export default TextSection;
