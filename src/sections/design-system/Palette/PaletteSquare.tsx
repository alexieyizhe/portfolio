import styled from "styled-components";

const PaletteSquare = styled.span<{ color: string }>`
  display: inline-block;
  width: 50px;
  height: 50px;

  background-color: ${({ theme, color }) => theme.color[color]};
  border-radius: ${({ theme }) => theme.borderRadius.card}px;
  margin-right: 10px;
`;

export default PaletteSquare;
