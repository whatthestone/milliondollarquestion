import React, { Component } from "react";
import styled from "styled-components";
import { Row, Card, Container, Nav, Tab, Tabs } from "react-bootstrap";
import RecipeMethod from "./RecipeMethod.js";
import RecipeIngredients from "./RecipeIngredients.js";

const STabs = styled(Tabs)`
  width: 100%;
  margin-top: 20px;
  border-bottom: 1px solid #dee2e6;
`;

const SContainer = styled(Container)`
  padding-top: 10px;
`


class Recipe extends Component {
  render() {
    return (
      <SContainer>
        <STabs defaultActiveKey="ingredients" id="uncontrolled-tab-example">
          <Tab eventKey="ingredients" title="Ingredients">
            <RecipeIngredients />
          </Tab>
          <Tab eventKey="method" title="Method">
            <RecipeMethod />
          </Tab>
        </STabs>
      </SContainer>
    );
  }
}

export default Recipe;
