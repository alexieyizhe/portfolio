import React from "react";
import styled from "styled-components";

import { BaseElementProps } from "~utils/typings/BaseElementProps";

const Container = styled.div`
  width: 200px;
  height: 120px;
  padding: 20px 30px;

  border-radius: ${({ theme }) => theme.borderRadius.card}px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 8%);
`;

const Card: React.FC<BaseElementProps> = ({ className, children }) => (
  <Container className={className}>{children}</Container>
);

export default Card;
export { default as SimpleCard } from "./SimpleCard";
