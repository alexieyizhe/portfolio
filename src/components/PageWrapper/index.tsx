import React from "react";
import styled from "styled-components";

interface PageWrapperProps {
  title?: string; // The largest and main title on the page
  subtitle?: string; // Smaller text, displayed above the title and in line with the back button if there is one.
}

const StyledWrapper = styled.div``;

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => (
  <StyledWrapper>{children}</StyledWrapper>
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
