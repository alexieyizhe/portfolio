import React from "react";
import styled from "styled-components";

import { IconLink } from "~src/components";

const Container = styled.div`
  position: absolute;
  bottom: 10vh;
`;

const QuickLinks = () => (
  <Container>
    <IconLink iconName="file-text" color="red" href="/resume" size={36}>
      resume
    </IconLink>

    <IconLink iconName="github" color="blue" href="github.com" size={36}>
      github
    </IconLink>

    <IconLink
      iconName="send"
      color="green"
      href="mailto:alexieyizhe@gmail.com"
      size={36}
    >
      email
    </IconLink>
  </Container>
);

export default QuickLinks;
