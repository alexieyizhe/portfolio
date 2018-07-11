import React from "react";
import styled from "styled-components";
import { mediaSize } from "../data/configOptions.js";


const Header = styled.div`
  display: inline-block;
  margin-bottom: 5vmax;
  font-size: 5em;
  font-weight: bold;
  font-family: "Ubuntu", sans-serif;

  ${mediaSize.tablet`
    font-size: 4em;
    letter-spacing: -0.07em;
  `}

  ${mediaSize.phone`
    font-size: 3em;
  `}
`;

const PageHeader = (props) => (
  <Header>{props.title}</Header>
);

export default PageHeader;
