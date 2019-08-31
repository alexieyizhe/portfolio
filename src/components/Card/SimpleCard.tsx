import React from "react";
import styled from "styled-components";

interface SimpleCardProps {
  imgSrc?: string;
  title?: string;
  link?: string;
  particles?: boolean;
}

const SimpleCard: React.FC<SimpleCardProps> = () => <div>simple card</div>;

export default SimpleCard;
