import React from "react";
import styled from "styled-components";
import { mediaSize } from "../data/configOptions.js";
import { isIOS } from 'react-device-detect';


const Header = styled.div`
  display: inline-block;
  margin-bottom: 5vmax;
  font-size: 5em;
  font-weight: bold;
  font-family: "Ubuntu", sans-serif;

  ${mediaSize.tablet`
    font-size: 4em;
    letter-spacing: ${isIOS ? '-0.05em' : 0};
  `}

  ${mediaSize.phone`
    font-size: 3em;
  `}
`;

const PageHeader = (props) => (
  <Header>{props.title}</Header>
);

export default PageHeader;
