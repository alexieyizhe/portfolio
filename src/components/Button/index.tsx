import React from "react";
import styled from "styled-components";

import Icon, { IconProps } from "~components/Icon";
import Card from "~components/Card";
import { Size } from "~types/Size";

export interface ButtonProps extends IconProps {
  disabled?: boolean;
}

export const BUTTON_SIZE = 45;

export const UnstyledButton = styled.button`
  padding: 0;
  border: none;
  font: inherit;
  color: inherit;
  background-color: transparent;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

export const ButtonCard = styled(Card)<{ disabled?: boolean }>`
  display: inline-block;
  border-radius: 50%;
  width: ${BUTTON_SIZE}px;
  height: ${BUTTON_SIZE}px;

  background-color: white;
  padding: 5px;
  border: none;

  transition: transform 150ms ease-in;
  &:hover,
  &:focus,
  &:focus-within {
    transform: translateY(${({ disabled }) => (disabled ? "0" : "-2px")});
  }

  & * {
    width: 100%;
    height: 100%;
  }
`;

const Button: React.FC<ButtonProps> = ({
  name,
  color,
  disabled,
  onClick,
  ...rest
}) => (
  <ButtonCard disabled={disabled} {...rest}>
    <UnstyledButton onClick={onClick} disabled={disabled}>
      <Icon
        name={name}
        animate={false}
        color={disabled ? "greyMedium" : color}
        size={Size.MEDIUM}
      />
    </UnstyledButton>
  </ButtonCard>
);

export default Button;
