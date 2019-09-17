import React from "react";

import copy from "~assets/copy";

import ElementGroup from "~sections/design-system/components/ElementGroup";
import Link, { UnstyledLink } from "~components/Link";
import Button from "~components/Button";

const LinkAndButtonSection = () => (
  <ElementGroup
    title={copy.designSystemSection.sections.linkandbutton.title}
    desc={copy.designSystemSection.sections.linkandbutton.desc}
  >
    <Link to="/" variant="body">
      Here&apos;s a link
    </Link>
    <UnstyledLink to="/">An unstyled link</UnstyledLink>
    <div>
      <Button name="download" />
    </div>
  </ElementGroup>
);

export default LinkAndButtonSection;
