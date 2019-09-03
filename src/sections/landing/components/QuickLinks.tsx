import React from "react";
import styled from "styled-components";

import { IconLink } from "~src/components";

const Container = styled.div`
  position: absolute;
  bottom: 10vh;
`;

const QuickLinks = () => (
  <Container>
    <IconLink name="file-text" color="red" href="/resume" size={36}>
      resume
    </IconLink>

    <IconLink name="github" color="blue" href="github.com" size={36}>
      github
    </IconLink>

    <IconLink
      name="send"
      color="green"
      href="mailto:alexieyizhe@gmail.com"
      size={36}
    >
      email
    </IconLink>
  </Container>
);

export default QuickLinks;
