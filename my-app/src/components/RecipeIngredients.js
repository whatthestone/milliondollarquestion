import React from "react";
import styled from "styled-components";
// import { Container } from "react-bootstrap";

const Wrapper = styled.div`
  margin-top: 30px;
`;

const RecipeIngredients = () => {
  return (
    <Wrapper>
        <h4>Ingredients</h4>
        <ul>
          <li>Chicken | 1 whole</li>
          <li>White Rice | 500 grams</li>
        </ul>
    </Wrapper>
  );
};

export default RecipeIngredients;
