import React from "react";
import styled from "styled-components";

import TemplateWrapper from "../components/TemplateWrapper.js";
import Glitch from "../components/Glitch.js";

const ErrorContainer = styled.div`
  width: 80%;
  font-family: "PT Sans";
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 21vh 40vh 36vh;
  grid-row-gap: 2vh;
  text-align: center;
  grid-template-areas: "message"
                       "code"
                       "redirect";
`

const ErrorMessage = styled.div`
  grid-area: message;
  align-self: end;
  justify-self: center;
  font-size: 3vmax;
  color: #555555;
`;

const ErrorCode = styled.div`
  grid-area: code;
  align-self: center;
  justify-self: center;
`

const ErrorRedirect = styled.div`
  grid-area: redirect;
  align-self: begin;
  justify-self: center;
  font-size: 3vmax;
  color: #555555;
  position: relative;
  top: 2vmax;

  & a {
    color: black;
    text-decoration: overline;


    &:hover {
      text-decoration: none;
    }
  }

`;

const InvalidURLPage = (props) => (
  <TemplateWrapper title="o no woops">
    <ErrorContainer>
      <ErrorMessage>
        Yikes! That page doesn't exist.
      </ErrorMessage>
      <ErrorCode>
        <Glitch text="404" color="black" font="bolder 20vmax Raleway" />
      </ErrorCode>
      <ErrorRedirect>
        You can <a href="mailto:alexieyizhe@gmail.com">yell at the guy who made this mistake</a> or <a href="/">go home</a>.
      </ErrorRedirect>
    </ErrorContainer>
  </TemplateWrapper>
);



export default InvalidURLPage;
