import React from "react";
import styled from "styled-components";

import { Link, Icon, Text, Gallery } from "~src/components";
import copy from "~assets/copy";

const sectionCopy = copy.aboutSection;

const Container = styled.div`
  display: flex;
  align-items: center;

  margin-top: 250px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin-left: 50px;

  & h3 {
    position: relative;
    left: -90px;
    margin-bottom: 20px;
  }

  & p {
    margin-bottom: 10px;
  }
`;

const ReadMoreLink = styled.div`
  display: flex;
  align-items: center;

  margin-top: 20px;
`;

const About = () => (
  <Container>
    <Gallery images={[sectionCopy.avatarImg]} />
    <TextContainer>
      <Text variant="heading" as="h3">
        {sectionCopy.title}
      </Text>

      <div>
        {sectionCopy.desc.map(paragraph => (
          <Text key={paragraph}>{paragraph}</Text>
        ))}
      </div>

      <ReadMoreLink>
        <Link
          variant="body"
          bold
          href={sectionCopy.readMore.linkHref}
          as="span"
          color="greyMedium"
        >
          {sectionCopy.readMore.linkText}
        </Link>
        <Icon name="arrow-right" color="greyMedium" />
      </ReadMoreLink>
    </TextContainer>
  </Container>
);

export default About;
