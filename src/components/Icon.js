import React from "react";
import styled from "styled-components";

const IconWrapper = styled.span`
  & svg {
    width: ${props => props.size};
    height: ${props => props.size};
    stroke: ${props => props.color};
  }
`;

const icons = {
  paper_plane: <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
              </svg>,
  file: <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
        </svg>,
  up_arrow: <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 11l-5-5-5 5M17 18l-5-5-5 5"/>
            </svg>,
  github: <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
          </svg>,
  linkedin: <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
              <path d="M2,4a2,2 0 1,0 4,0a2,2 0 1,0 -4,0"/>
            </svg>,
  monitor: <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
             <path d="M2 3 L23 3 L23 17 L2 17 L2 3"/>
             <path d="M8 21h8M12 17v4"/>
           </svg>,
  tablet: <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 2 L21 2 L21 22 L3 22 L3 2"/>
            <path d="M11,17a1,1 0 1,0 2,0a1,1 0 1,0 -2,0"/>
          </svg>,
  smartphone: <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 2 L19 2 L19 22 L5 22 L5 2"/>
                <path d="M11,17a1,1 0 1,0 2,0a1,1 0 1,0 -2,0"/>
              </svg>,
  code: <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/>
        </svg>,
  terminal: <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 17l6-6-6-6M12 19h8"/>
            </svg>,
  play_circle: <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2,12a10,10 0 1,0 20,0a10,10 0 1,0 -20,0"/>
                <path d="M10 8l6 4-6 4V8z"/>
              </svg>,
  shopping_bag: <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0"/>
                </svg>,
  message_square: <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>,
}

const Icon = (props) => (
  <IconWrapper size={props.size} color={props.color} >
    {icons[props.name]}
  </IconWrapper>
);

export default Icon;
