import React from "react";
import styled from "styled-components";

import Text from "~components/Text";

interface ElementGroupProps {
  title: string;
  desc: string[];
}

const ElementGroupContainer = styled.div`
  display: grid;
  grid-row-gap: 1em;
  grid-template-rows: 2em auto;
  grid-template-columns: 55% 45%;
  grid-template-areas:
    "title desc"
    "nodes desc";

  margin-bottom: 5em;

  & .title {
    grid-area: title;
  }

  & .desc {
    grid-area: desc;
    & > * {
      margin-bottom: 8px;
    }
  }

  & .nodes {
    grid-area: nodes;
  }
`;

const ElementGroup: React.FC<ElementGroupProps> = ({
  title,
  desc,
  children,
}) => (
  <ElementGroupContainer>
    <Text variant="body" bold color="purple" className="title">
      {title}
    </Text>
    <div className="desc">
      {desc.map(text => (
        <Text variant="body" key={text}>
          {text}
        </Text>
      ))}
    </div>

    <div className="nodes">{children}</div>
  </ElementGroupContainer>
);

export default ElementGroup;
