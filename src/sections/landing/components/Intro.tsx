import React, { useMemo, useCallback, useState } from "react";
import styled from "styled-components";
import TextLoop from "react-text-loop";
import { animated } from "react-spring";

import copy from "~assets/copy";
import { boopAnim } from "~utils/animations";
import { useSiteContext } from "~utils/context";

import { BaseElementProps } from "~types/BaseElementProps";
import { Text } from "~src/components";

const greetings = copy.mainLandingSection.greetings;
const BOOPS_REQUIRED_TO_ACTIVATE = 5;

const Container = styled(animated.div)`
  & .boop {
    animation: ${boopAnim} 250ms ease-in-out 1;
  }

  & > h1 {
    font-size: 70px;
    cursor: pointer;
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
  const { activateEasterEgg } = useSiteContext();

  const [isBooping, startBoop] = useState(false);
  const [boopedTimes, setBoopTimes] = useState(0);

  const displayedGreeting = useMemo(() => {
    const randomGreeting =
      greetings[Math.floor(Math.random() * greetings.length)];
    return `${randomGreeting} My name's`;
  }, []);

  const nameOnClick = useCallback(() => {
    startBoop(true);
    setBoopTimes(prevTimes => prevTimes + 1);
    if (boopedTimes + 1 >= BOOPS_REQUIRED_TO_ACTIVATE) {
      activateEasterEgg();
    }
  }, [activateEasterEgg, boopedTimes]);

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
