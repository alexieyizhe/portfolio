import React from "react";
import styled from "styled-components";
import { mediaSize } from "../data/configOptions.js";

import TemplateWrapper from "../components/TemplateWrapper.js";

import { archiveSiteList } from "../data/archiveData.js";

const Header = styled.div`
  display: inline-block;
  margin-bottom: 5vmax;
  font-size: 6vh;
  font-weight: bold;
  font-family: "PT Serif";
`;

const PageLink = styled.a`
  font-family: "PT Serif";
  display: block;
  color: inherit;
  line-height: 2;

  ${mediaSize.tablet`
    font-size: 2em;
  `}

  ${mediaSize.phone`
    font-size: 1em;
  `}
`

class ArchivePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TemplateWrapper title="Archive" menu footer outerBounds={{ top: '7%', left: '15%', right: '15%', bottom: '0' }}>
        <Header className="navMenu">archive.</Header>
        {archiveSiteList.map((snapshot, i) => {
          return <PageLink key={i} href={snapshot.url}>{snapshot.name}</PageLink>
        })}
      </TemplateWrapper>
    );
  }
}


export default ArchivePage;
