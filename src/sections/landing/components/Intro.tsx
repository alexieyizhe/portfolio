import React, { useMemo } from "react";
import styled from "styled-components";
import TextLoop from "react-text-loop";
import { animated } from "react-spring";

import copy from "~assets/copy";
import { Text } from "~src/components";

const greetings = copy.mainLandingSection.greetings;

const Container = styled(animated.div)`
  & > h1 {
    font-size: 70px;
  }

  & span {
    font-size: 30px;
  }

  ${({ theme }) => theme.mediaQueries.largeMobile`
    & > h1 {
      font-size: 50px;
    }

    & span {
      font-size: 22px;
    }
  `}
`;

const QuickLinks: React.FC = props => {
  const displayedGreeting = useMemo(() => {
    const randomGreeting =
      greetings[Math.floor(Math.random() * greetings.length)];
    return `${randomGreeting} My name's`;
  }, []);

  return (
    <Container {...props}>
      <Text as="span" heading>
        {displayedGreeting}
      </Text>
      <Text bold as="h1" heading>
        {copy.mainLandingSection.name}
      </Text>
      <Text as="span" heading>
        {copy.mainLandingSection.taglinePrefix}
      </Text>
      <TextLoop>
        {copy.mainLandingSection.taglines.map(line => (
          <Text key={line} as="span" heading bold>
            {line}
          </Text>
        ))}
      </TextLoop>
    </Container>
  );
};

export default QuickLinks;
