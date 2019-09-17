import React from "react";
import styled from "styled-components";

import Text from "~components/Text";
import Helmet from "~components/Helmet";
import Button, { BUTTON_SIZE } from "~components/Button";
import { BaseElementProps } from "~types/BaseElementProps";

interface PageWrapperProps extends BaseElementProps {
  title?: string; // Title for display in tab
  heading?: string; // The largest and main title on the page
  subheading?: string; // Smaller text, displayed above the title and in line with the back button if there is one.

  sideButton?: boolean;
  iconName?: string;
  iconOnClick?: () => void;
}

export const PAGE_VERT_PADDING = 15;
export const PAGE_HORIZ_PADDING = 15;

export const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: ${PAGE_VERT_PADDING}vh ${PAGE_HORIZ_PADDING}vw;

  ${({ theme }) => theme.mediaQueries.tablet`
    padding: ${PAGE_VERT_PADDING - 5}vh ${PAGE_HORIZ_PADDING - 5}vw;
  `}

  ${({ theme }) => theme.mediaQueries.largeMobile`
    padding: ${PAGE_VERT_PADDING - 5}vh ${PAGE_HORIZ_PADDING - 5}vw;
  `}
`;

const InnerContainer = styled.div`
  position: relative;
  max-width: 1500px;
  width: 100%;

  display: flex;
  flex-direction: column;

  & > .PageWrapper--Heading {
    margin-bottom: 0.5em;
  }
`;

const NarrowHeading = styled(Text)`
  max-width: 50%;
`;

const SideButton = styled(Button)`
  position: absolute;
  top: 0;
  left: -${BUTTON_SIZE + 30}px;
`;

const PageWrapper: React.FC<PageWrapperProps> = ({
  title,
  heading,
  subheading,
  children,
  className,
  sideButton = false,
  iconName = "",
  iconOnClick,
  id,
}) => (
  <>
    <Helmet title={title} />
    <PageContainer>
      <InnerContainer className={className} id={id}>
        {subheading && (
          <NarrowHeading
            className="PageWrapper--Subheading"
            variant="subheading"
          >
            {subheading}
          </NarrowHeading>
        )}
        {heading && (
          <NarrowHeading className="PageWrapper--Heading" variant="heading">
            {heading}
          </NarrowHeading>
        )}
        {sideButton && <SideButton name={iconName} onClick={iconOnClick} />}
        {children}
      </InnerContainer>
    </PageContainer>
  </>
);

/**
 * A HOC to wrap your component with the PageWrapper component.
 */
export const withPageWrapper = <T extends {}>(
  Component: React.FC<T>
): React.FC<T> => props => (
  <>
    <PageWrapper>
      <Component {...props} />
    </PageWrapper>
  </>
);

export default PageWrapper;
