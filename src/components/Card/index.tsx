import React from "react";
import styled from "styled-components";

import { BaseElementProps } from "~utils/typings/BaseElementProps";

export interface CardProps extends BaseElementProps {}

export const CARD_HORIZ_PADDING = 30;
export const CARD_VERT_PADDING = 20;

const Container = styled.div`
  width: 200px;
  height: 120px;
  padding: ${CARD_VERT_PADDING}px ${CARD_HORIZ_PADDING}px;

  border-radius: ${({ theme }) => theme.borderRadius.card}px;
  box-shadow: ${({ theme }) => theme.boxShadow.main};
`;

const Card: React.FC<CardProps> = ({ id, className, onClick, children }) => (
  <Container id={id} className={className} onClick={onClick}>
    {children}
  </Container>
);

export default Card;
