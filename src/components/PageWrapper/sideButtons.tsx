import React from "react";
import { ButtonCard } from "~components/Button";
import { UnstyledLink } from "~components/Link";
import Icon from "~components/Icon";

export const HomeButtonMarkup = (
  <ButtonCard>
    <UnstyledLink to="/">
      <Icon name="arrow-left" animate={false} />
    </UnstyledLink>
  </ButtonCard>
);
