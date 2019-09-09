import React from "react";
import styled from "styled-components";

import { SpookyScaryImg } from "~assets/images";

const ScaredImg = styled.img`
  max-width: 250px;

  position: absolute;
  bottom: -40px;
  right: 20%;
`;
const NotFoundPage = () => (
  <div>
    <ScaredImg src={SpookyScaryImg} />
  </div>
);

export default NotFoundPage;
