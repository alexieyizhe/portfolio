import { keyframes } from "styled-components";

export const floatAnim = keyframes`
  0% {
      transform: rotate(10deg) translateY(0)
  }
  50% {
      transform: rotate(5deg) translateY(-10px)
  }
  to {
      transform: rotate(10deg) translateY(0)
  }
`;
