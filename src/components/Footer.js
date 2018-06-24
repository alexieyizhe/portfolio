import React from "react";
import styled from "styled-components";

const FooterContainer = styled.div`
  background-color: black;
  width: 100%;
  position: absolute;
  bottom: 0;
`;

const Footer = () => (
  <FooterContainer>this is the footer</FooterContainer>
);

export default Footer;
