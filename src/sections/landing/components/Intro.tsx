import React, { useMemo, useCallback, useState } from "react";
import styled from "styled-components";
import TextLoop from "react-text-loop";
import { animated } from "react-spring";

import copy from "~assets/copy";
import { boopAnim } from "~utils/animations";
import { BaseElementProps } from "~types/BaseElementProps";
import { Text } from "~src/components";

const greetings = copy.mainLandingSection.greetings;

const Container = styled(animated.div)`
  & .boop {
    animation: ${boopAnim} 0.3s ease-in-out 1;
  }

  & > h1 {
    font-size: 70px;
    transform-origin: center center;
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

const QuickLinks: React.FC<BaseElementProps> = props => {
  const [isBooping, startBoop] = useState(false);

  const displayedGreeting = useMemo(() => {
    const randomGreeting =
      greetings[Math.floor(Math.random() * greetings.length)];
    return `${randomGreeting} My name's`;
  }, []);

  const nameOnClick = useCallback(() => startBoop(true), []);
  const nameAnimEnd = useCallback(() => startBoop(false), []);

  return (
    <Container {...props}>
      <Text as="span" heading>
        {displayedGreeting}
      </Text>
      <Text
        className={isBooping ? "boop" : ""}
        bold
        as="h1"
        heading
        onClick={nameOnClick}
        onAnimationEnd={nameAnimEnd}
      >
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
