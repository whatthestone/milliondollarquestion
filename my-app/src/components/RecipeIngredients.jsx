import React, { Component } from "react";
import styled from "styled-components";
// import { Container } from "react-bootstrap";

const Wrapper = styled.div`
  margin-top: 30px;
`;

class RecipeIngredients extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const ingredients = this.props.ingredients;

    return (
      <Wrapper>
        <h4>Ingredients</h4>
        <ul>
          {ingredients &&
            ingredients.map((ingredient, index) => {
              return <li key={index}>{ingredient.original}</li>;
            })}
        </ul>
      </Wrapper>
    );
  }
}

export default RecipeIngredients;
