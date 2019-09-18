import React from "react";
import styled from "styled-components";

import { Text, Gallery } from "~src/components";
import copy from "~assets/copy";

const sectionCopy = copy.aboutSection;

const Container = styled.div`
  min-height: 65vh;
  align-self: center;

  display: inline-flex;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.tablet`
    flex-direction: column;
    justify-content: center;
  `}

  ${({ theme }) => theme.mediaQueries.largeMobile`
    min-height: 120vh;
  `}
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin-left: 50px;

  & h3 {
    position: relative;
    left: -40px;
    margin-bottom: 40px;
  }

  & p {
    position: relative;
    margin-bottom: 10px;
  }

  ${({ theme }) => theme.mediaQueries.tablet`
    margin-left: 20px;

    & h3, 
    & p {
      left: unset;
      text-align: center;
    }

    & h3 {
      margin-top: 20px;
      margin-bottom: 20px;
    }
  `}

  ${({ theme }) => theme.mediaQueries.largeMobile`
    margin-left: 0;
    margin-top: 10px;
  `}
`;

// const ReadMoreLink = styled.div`
//   display: flex;
//   align-items: center;

//   margin-top: 20px;
// `;

const About = () => (
  <Container>
    <Gallery images={[sectionCopy.avatarImg]} particles />
    <TextContainer>
      <Text variant="heading" as="h3">
        {sectionCopy.heading}
      </Text>

      <div>
        {sectionCopy.desc.map(paragraph => (
          <Text key={paragraph}>{paragraph}</Text>
        ))}
      </div>

      {/* <ReadMoreLink>
        <Link
          variant="body"
          bold
          to={sectionCopy.readMore.linkHref}
          as="span"
          color="greyMedium"
        >
          {sectionCopy.readMore.linkText}
        </Link>
        <Icon name="arrow-right" color="greyMedium" />
      </ReadMoreLink> */}
    </TextContainer>
  </Container>
);

export default About;
