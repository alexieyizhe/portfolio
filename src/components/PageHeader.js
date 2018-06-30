import React from "react";
import styled from "styled-components";

const Header = styled.div`
  display: inline-block;
  margin-bottom: 5%;
  font-size: 3em;
  font-weight: bold;
`;

const PageHeader = (props) => (
  <Header>{props.title}</Header>
);

export default PageHeader;
