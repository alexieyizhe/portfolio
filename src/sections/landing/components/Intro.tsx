import React, { useMemo } from "react";
import styled from "styled-components";
import TextLoop from "react-text-loop";

import copy from "~assets/copy";
import { Text } from "~src/components";

const greetings = copy.mainLandingSection.greetings;

const Container = styled.div``;

const QuickLinks = () => {
  const displayedGreeting = useMemo(() => {
    const randomGreeting =
      greetings[Math.floor(Math.random() * greetings.length)];
    return `${randomGreeting} My name's`;
  }, []);

  return (
    <Container>
      <Text size={30}>{displayedGreeting}</Text>
      <Text size={70} bold>
        {copy.mainLandingSection.name}
      </Text>
      <Text size={30} as="span">
        {copy.mainLandingSection.taglinePrefix}
      </Text>
      <TextLoop>
        {copy.mainLandingSection.taglines.map(line => (
          <Text size={30} key={line} as="span" bold>
            {line}
          </Text>
        ))}
      </TextLoop>
    </Container>
  );
};

export default QuickLinks;
