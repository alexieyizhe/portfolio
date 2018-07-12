import React from "react";
import styled from "styled-components";

import Link from "gatsby-link";
import TemplateWrapper from "../components/TemplateWrapper.js";
import GlitchText from "../components/GlitchText.js";


const ErrorContainer = styled.div`
  width: 80%;
  font-family: "PT Sans", sans-serif;;
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 21vh 42vh 36vh;
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

class InvalidURLPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const pathname = this.props.location.pathname
    return (
      <TemplateWrapper title="Error 404">
        <ErrorContainer style={this.props.transition && this.props.transition.style}>
          <ErrorMessage>
            Yikes! There isn't a page here.
          </ErrorMessage>
          <ErrorCode>
            <GlitchText text="404" color="black" font="bolder 20vmax Lato" />
          </ErrorCode>
          <ErrorRedirect>
            You can <a href="mailto:alexieyizhe@gmail.com">complain to Alex</a> or <Link to="/">go home</Link>.
          </ErrorRedirect>
        </ErrorContainer>
      </TemplateWrapper>
    );
  }
}



export default InvalidURLPage;
