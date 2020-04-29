import React, { useState } from "react";
import styled from "styled-components";
import {
  Container,
  Card,
  CardColumns,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";

const SCardColumns = styled(CardColumns)`
  padding-top: 50px;

  @media (min-width: 996px) and (max-width: 1200px) {
    column-count: 4;
  }

  @media (min-width: 1200px) {
    column-count: 5;
  }
`

const Header = styled.h3`
  padding-top: 30px;
  font-weight: 700 !important;
  text-align: center;
`

const SCardText = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
`

const Subheader = styled.div`
  font-weight: 500;
  padding-top: 5px;
  padding-bottom: 5px;
`

const Saved = ({}) => {
  const [savedRecipes] = useState(
    JSON.parse(localStorage.getItem("savedRecipes"))
  );

  return (
    <Container>
      <Header>Saved Recipes</Header>
      <SCardColumns>
        {savedRecipes &&
          savedRecipes.map((recipe, key) => (
            <Card key={key}>
              <Card.Img variant="top" src={recipe.image} />
              <Card.Body>
                <Card.Title>{recipe.title}</Card.Title>
                <SCardText style={{ maxLines: "5" }}>
                  <Subheader>Ingredients: </Subheader>
                  {recipe.extendedIngredients &&
                    recipe.extendedIngredients.map(
                      (ingredient, index) => index ? `, ${ingredient.name}` : `${ingredient.name}`
                    )}
                </SCardText>
              </Card.Body>
            </Card>
          ))}
      </SCardColumns>
    </Container>
  );
};

export default Saved;
