import React from "react";
import styled from "styled-components";

import Text from "~components/Text";
import Icon from "~components/Icon";
import { UnstyledLink } from "~components/Link";

import { Size } from "~types/Size";
import copy from "~assets/copy";

const landingSectionCopy = copy.mainLandingSection;
const footerCopy = copy.footer;

const scrollToTop = () =>
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

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

  ${({ theme }) => theme.mediaQueries.tablet`
    width: 90%;
  `}
`;

const Footer = () => (
  <Container>
    <div className="icons">
      <UnstyledLink href={landingSectionCopy.links.github}>
        <Icon name="github" color="blue" animate />
      </UnstyledLink>

      <UnstyledLink href={landingSectionCopy.links.resume}>
        <Icon name="file-text" color="purple" animate />
      </UnstyledLink>

      <Icon
        name="chevrons-up"
        color="black"
        animate
        size={Size.XLARGE}
        onClick={scrollToTop}
      />

      <UnstyledLink href={landingSectionCopy.links.mail}>
        <Icon name="send" color="green" animate />
      </UnstyledLink>

      <UnstyledLink href={landingSectionCopy.links.linkedin}>
        <Icon name="linkedin" color="steelblue" animate />
      </UnstyledLink>
    </div>

    <Text size={Size.XSMALL} align="center" color="greyMedium">
      {footerCopy.text}
    </Text>
  </Container>
);

export default Footer;
