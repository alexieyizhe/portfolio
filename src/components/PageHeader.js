import React from "react";
import styled from "styled-components";

const Header = styled.div`
  display: inline-block;
  margin-bottom: 5vmax;
  font-size: 6vh;
  font-weight: bold;
  font-family: "Ubuntu", sans-serif;
  letter-spacing: 0;
`;

const PageHeader = (props) => (
  <Header>{props.title}</Header>
);

export default PageHeader;
