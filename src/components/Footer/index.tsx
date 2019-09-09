import React, { useCallback } from "react";
import styled from "styled-components";

import { Text, Icon, UnstyledLink } from "~src/components";
import { Size } from "~types/Size";
import copy from "~assets/copy";

const Container = styled.div`
  position: relative;
  width: 500px;
  margin: 0 auto;
  opacity: 0.7;

  & > .icons {
    width: 200px;
    margin: 10px auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > * {
      cursor: pointer;
    }
  }
`;

const Footer = () => {
  const scrollToTop = useCallback(
    () => window.scrollTo({ top: 0, left: 0, behavior: "smooth" }),
    []
  );

  return (
    <Container>
      <div className="icons">
        <UnstyledLink href={copy.mainLandingSection.links.github}>
          <Icon name="github" color="greyMedium" />
        </UnstyledLink>

        <UnstyledLink href={copy.mainLandingSection.links.resume}>
          <Icon name="file-text" color="greyMedium" />
        </UnstyledLink>

        <Icon
          name="chevrons-up"
          color="greyMedium"
          size={Size.XLARGE}
          onClick={scrollToTop}
        />

        <UnstyledLink href={copy.mainLandingSection.links.mail}>
          <Icon name="send" color="greyMedium" />
        </UnstyledLink>

        <UnstyledLink href={copy.mainLandingSection.links.linkedin}>
          <Icon name="linkedin" color="greyMedium" />
        </UnstyledLink>
      </div>

      <Text size={Size.XSMALL} align="center" color="greyMedium">
        {copy.footer.text}
      </Text>
    </Container>
  );
};

export default Footer;
