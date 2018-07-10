import React from "react";
import styled from "styled-components";
import { mediaSize } from "../data/configOptions.js";

const Header = styled.div`
  display: inline-block;
  margin-bottom: 5vmax;
  font-size: 6vh;
  font-weight: bold;
  font-family: "Ubuntu", sans-serif;

  ${mediaSize.phone`
    letter-spacing: -0.2em;
  `}
`;

const PageHeader = (props) => (
  <Header>{props.title}</Header>
);

export default PageHeader;
