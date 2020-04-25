import React, { Component } from "react";
import styled from "styled-components";
import { Container, Tab, Tabs } from "react-bootstrap";
import RecipeMethod from "./RecipeMethod";
import RecipeIngredients from "./RecipeIngredients";

const STabs = styled(Tabs)`
  width: 100%;
  margin-top: 20px;
  border-bottom: 1px solid #dee2e6;
`;

const SContainer = styled(Container)`
  padding-top: 10px;
`;

class Recipe extends Component {
  render() {
    const methods = this.props.recipeMethod;
    const ingredients = this.props.recipeIngredients;
    const id = this.props.id;

    return (
      <SContainer>
        <STabs defaultActiveKey="ingredients" id="uncontrolled-tab-example">
          <Tab eventKey="ingredients" title="Ingredients">
            <RecipeIngredients key={id} id={id} ingredients={ingredients} />
          </Tab>
          <Tab eventKey="method" title="Method">
            <RecipeMethod key={id} id={id} methods={methods}/>
          </Tab>
        </STabs>
      </SContainer>
    );
  }
}

export default Recipe;
