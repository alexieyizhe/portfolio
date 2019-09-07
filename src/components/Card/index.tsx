import styled from "styled-components";

export const CARD_HORIZ_PADDING = 30;
export const CARD_VERT_PADDING = 20;

const Card = styled.article`
  position: relative;

  width: 200px;
  height: 120px;
  padding: ${CARD_VERT_PADDING}px ${CARD_HORIZ_PADDING}px;

  border-radius: ${({ theme }) => theme.borderRadius.card}px;
  box-shadow: ${({ theme }) => theme.boxShadow.main};
`;

export default Card;
