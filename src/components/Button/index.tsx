import React from "react";
import styled from "styled-components";

import { BaseElementProps } from "~src/utils/typings/BaseElementProps";

export interface ButtonProps extends BaseElementProps {}

const Container = styled.button`
  border-radius: 50%;
  width: 50px;
  height: 50px;

  padding: 5px;
  border: none;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.boxShadow.main};

  transition: transform 150ms ease-in;
  cursor: pointer;
  &:hover,
  &:focus,
  &:focus-within {
    transform: translateY(-2px);
  }
`;

const Button: React.FC<ButtonProps> = ({ onClick }) => (
  <Container onClick={onClick}>hi</Container>
);

export default Button;
