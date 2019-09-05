import React from "react";
import styled from "styled-components";

import Text from "~components/Text";

interface PageWrapperProps {
  title?: string; // The largest and main title on the page
  subtitle?: string; // Smaller text, displayed above the title and in line with the back button if there is one.
}

export const PageContainer = styled.div`
  position: relative;
  width: 90%;
  max-width: 1700px;
  margin: auto;
  padding: 15vh 130px;

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
  <PageContainer>
    {subtitle && (
      <NarrowHeading className="PageWrapper-Subheading" variant="subheading">
        {subtitle}
      </NarrowHeading>
    )}
    {title && (
      <NarrowHeading className="PageWrapper--Heading" variant="heading">
        {title}
      </NarrowHeading>
    )}
    {children}
  </PageContainer>
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
