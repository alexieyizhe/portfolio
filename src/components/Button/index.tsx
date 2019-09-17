import React from "react";
import styled from "styled-components";

import Icon, { IconProps } from "~components/Icon";
import { Size } from "~types/Size";

export interface ButtonProps extends IconProps {
  disabled?: boolean;
}

export const UnstyledButton = styled.button`
  padding: 0;
  border: none;
  font: inherit;
  color: inherit;
  background-color: transparent;
  cursor: pointer;
`;

export const BUTTON_SIZE = 45;

const Container = styled(UnstyledButton)<{ disabled?: boolean }>`
  border-radius: 50%;
  width: ${BUTTON_SIZE}px;
  height: ${BUTTON_SIZE}px;

  background-color: white;
  padding: 5px;
  border: none;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  box-shadow: ${({ theme }) => theme.boxShadow.main};

  transition: transform 150ms ease-in;
  &:hover,
  &:focus,
  &:focus-within {
    transform: translateY(${({ disabled }) => (disabled ? "0" : "-2px")});
  }
`;

const Button: React.FC<ButtonProps> = ({
  name,
  color,
  disabled,
  onClick,
  ...rest
}) => (
  <Container onClick={onClick} disabled={disabled} {...rest}>
    <Icon
      name={name}
      animate={false}
      color={disabled ? "greyMedium" : color}
      size={Size.MEDIUM}
    />
  </Container>
);

export default Button;
