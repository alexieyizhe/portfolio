import React from "react";
import styled from "styled-components";

const Header = styled.div`
  margin-bottom: 5%;
  font-size: 6vh;
  font-weight: bold;
`;

const PageHeader = (props) => (
  <Header>{props.children}</Header>
);

export default PageHeader;
