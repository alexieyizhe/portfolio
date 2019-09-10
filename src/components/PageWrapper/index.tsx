import React from "react";
import styled from "styled-components";

import Text from "~components/Text";
import Helmet from "~components/Helmet";
import Button, { BUTTON_SIZE } from "~components/Button";
import { BaseElementProps } from "~types/BaseElementProps";

interface PageWrapperProps extends BaseElementProps {
  title?: string; // The largest and main title on the page
  subtitle?: string; // Smaller text, displayed above the title and in line with the back button if there is one.

  sideButton?: boolean;
  iconName?: string;
  iconOnClick?: () => void;
}

export const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InnerContainer = styled.div`
  position: relative;
  max-width: 1700px;
  margin: 15vh 12vw;

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
  subtitle,
  children,
  className,
  sideButton = false,
  iconName = "",
  iconOnClick,
  id,
}) => (
  <>
    <Helmet />
    <PageContainer className={className} id={id}>
      <InnerContainer>
        {subtitle && (
          <NarrowHeading
            className="PageWrapper--Subheading"
            variant="subheading"
          >
            {subtitle}
          </NarrowHeading>
        )}
        {title && (
          <NarrowHeading className="PageWrapper--Heading" variant="heading">
            {title}
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
