import React from "react";
import styled from "styled-components";

import Text from "~components/Text";

interface PageWrapperProps {
  title?: string; // The largest and main title on the page
  subtitle?: string; // Smaller text, displayed above the title and in line with the back button if there is one.
}

const StyledWrapper = styled.div`
  position: relative;
  margin: 100px 160px;

  & > .PageWrapper--Heading {
    margin-bottom: 1em;
  }
`;

const NarrowHeading = styled(Text)`
  max-width: 50%;
`;

const PageWrapper: React.FC<PageWrapperProps> = ({
  title,
  subtitle,
  children,
}) => (
  <StyledWrapper>
    <NarrowHeading className="PageWrapper-Subheading" variant="subheading">
      {subtitle}
    </NarrowHeading>
    <NarrowHeading className="PageWrapper--Heading" variant="heading">
      {title}
    </NarrowHeading>
    {children}
  </StyledWrapper>
);

/**
 * A HOC to wrap your component with the PageWrapper component.
 */
const withPageWrapper = <T extends {}>(
  Component: React.FC<T>
): React.FC<T> => props => (
  <>
    <PageWrapper>
      <Component {...props} />
    </PageWrapper>
  </>
);

export { withPageWrapper };
export default PageWrapper;