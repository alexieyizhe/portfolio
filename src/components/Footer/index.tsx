import React, { useCallback } from "react";
import styled from "styled-components";

import { Text, Icon } from "~src/components";
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
        <Icon name="github" color="greyMedium" />
        <Icon name="file-text" color="greyMedium" />
        <Icon
          name="chevrons-up"
          color="greyMedium"
          size={Size.XLARGE}
          onClick={scrollToTop}
        />
        <Icon name="send" color="greyMedium" />
        <Icon name="linkedin" color="greyMedium" />
      </div>
      <Text size={Size.XSMALL} align="center" color="greyMedium">
        {copy.footer.text}
      </Text>
    </Container>
  );
};

export default Footer;
