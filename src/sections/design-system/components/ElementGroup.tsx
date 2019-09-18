import React from "react";
import styled from "styled-components";

import Text from "~components/Text";
import { BaseElementProps } from "~types/BaseElementProps";

interface ElementGroupProps extends BaseElementProps {
  title: string;
  desc: string[];
}

const ElementGroupContainer = styled.div`
  display: grid;
  grid-template-areas:
    "title desc"
    "nodes desc";
  grid-row-gap: 1em;
  grid-template-rows: 2em auto;
  grid-template-columns: 55% 45%;

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

  ${({ theme }) => theme.mediaQueries.tablet`
    grid-template-areas:
      "title"
      "nodes"
      "desc";
    grid-row-gap: 1em;
    grid-template-rows: 2em auto auto;
    grid-template-columns: 100%;
  `}
`;

const ElementGroup: React.FC<ElementGroupProps> = ({
  className,
  id,
  title,
  desc,
  children,
}) => (
  <ElementGroupContainer className={className} id={id}>
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
