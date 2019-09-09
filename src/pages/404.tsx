import React from "react";
import styled from "styled-components";

import { SpookyScaryImg } from "~assets/images";

import { Text } from "~src/components";

const ScaredImg = styled.img`
  max-width: 250px;

  position: absolute;
  bottom: -40px;
  right: 20%;
`;

const HeadingContainer = styled.div`
  margin: 25vh 20vw;
`;

const NotFoundPage = () => (
  <div>
    <HeadingContainer>
      <Text variant="heading">Oh no!</Text>
      <Text variant="heading">
        There&apos;s no page at {window.location.pathname}
      </Text>
    </HeadingContainer>

    <ScaredImg src={SpookyScaryImg} />
  </div>
);

export default NotFoundPage;
