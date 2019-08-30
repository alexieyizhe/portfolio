import React from "react";
import styled from "styled-components";

interface PageWrapperProps {
  title?: string; // The largest and main title on the page
  subtitle?: string; // Smaller text, displayed above the title and in line with the back button if there is one.
}

const StyledWrapper = styled.div`
  padding: 20px 30px;
`;

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => (
  <StyledWrapper>{children}</StyledWrapper>
);

export default PageWrapper;
