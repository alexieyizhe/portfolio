import React from "react";
import styled from "styled-components";

import Text from "~components/Text";
import Icon from "~components/Icon";
import { UnstyledLink } from "~components/Link";
import { UnstyledButton } from "~components/Button";

import { Size } from "~types/Size";
import { useSiteContext } from "~utils/context";
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

const Footer = () => {
  const { easterEggActive } = useSiteContext();

  return (
    <Container>
      <div className="icons">
        <UnstyledLink to={landingSectionCopy.links.github}>
          <Icon name="github" color="blue" animate />
        </UnstyledLink>

        <UnstyledLink to={landingSectionCopy.links.resume}>
          <Icon name="file-text" color="purple" animate />
        </UnstyledLink>

        <UnstyledButton onClick={scrollToTop}>
          <Icon name="chevrons-up" color="black" animate size={Size.XLARGE} />
        </UnstyledButton>

        <UnstyledLink to={landingSectionCopy.links.mail}>
          <Icon name="send" color="green" animate />
        </UnstyledLink>

        <UnstyledLink to={landingSectionCopy.links.linkedin}>
          <Icon name="linkedin" color="darkBlue" animate />
        </UnstyledLink>
      </div>

      <Text size={Size.XSMALL} align="center" color="greyMedium">
        {easterEggActive ? footerCopy.easterEggText : footerCopy.text}
      </Text>
    </Container>
  );
};

export default Footer;
