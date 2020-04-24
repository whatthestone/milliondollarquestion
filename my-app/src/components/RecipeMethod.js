import React from "react";
import styled from "styled-components";
// import { Container } from "react-bootstrap";

const Wrapper = styled.div`
  margin-top: 30px;
`;

const RecipeMethod = () => {
  return (
    <Wrapper>
        <h4>Method</h4>
        <ul>
          <li>Step 1 | Do This</li>
          <li>Step 2 | Do That</li>
        </ul>
    </Wrapper>
  );
};

export default RecipeMethod;
