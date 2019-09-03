import React, { useMemo } from "react";
import styled from "styled-components";
import TextLoop from "react-text-loop";

import copy from "~assets/copy";
import { HeroMe } from "~assets/images";
import { Text } from "~src/components";

const greetings = copy.mainLandingSection.greetings;

const Container = styled.section`
  position: relative;
  height: 90vh;
`;

const HeroImg = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;

  max-height: 80%;
`;

const Landing = () => {
  const displayedGreeting = useMemo(() => {
    const randomGreeting =
      greetings[Math.floor(Math.random() * greetings.length)];
    return `${randomGreeting} My name's`;
  }, []);

  return (
    <Container>
      <Text variant="heading">{displayedGreeting}</Text>
      <Text size={90}>{copy.mainLandingSection.name}</Text>
      <Text variant="heading" as="span">
        {copy.mainLandingSection.taglinePrefix}
      </Text>
      <TextLoop>
        {copy.mainLandingSection.taglines.map(line => (
          <Text variant="heading" key={line} as="span">
            {line}
          </Text>
        ))}
      </TextLoop>
      <HeroImg src={HeroMe} />
    </Container>
  );
};

export default Landing;
