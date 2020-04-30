import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Card, Button } from "react-bootstrap";
import Recipe from "./Recipe";

const SCard = styled(Card)`
  max-width: 600px;
  margin: auto;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const SCardTitle = styled.h4`
  font-weight: 700;
  padding-top: 0.5rem;
`;

const Link = styled.a`
  text-decoration: underline;
  color: black;
  align-self: flex-start;
  width: fit-content;
  vertical-align: -webkit-baseline-middle;
`;

const SRButton = styled(Button)`
  align-self: flex-end;
  width: fit-content;
  display: flex;
  float: right;
  border-radius: 15px;
  padding-right: 15px;
  padding-left: 15px;
  vertical-align: -webkit-baseline-middle;
`;

const StyledCardImg = styled(Card.Img)`
  width: 100%;
  height: 20rem;
  object-fit: cover;
  background: no-repeat center;
`;

const StyledCardBody = styled(Card.Body)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const RecommendedCard = ({ recipe, isSavedRecipe, onSave, onUnsave }) => {
  const [recipeSavedState, setRecipeSavedState] = useState(isSavedRecipe);

  useEffect(() => {
    setRecipeSavedState(isSavedRecipe);
  }, [isSavedRecipe]);

  return (
    <SCard>
      <StyledCardImg variant="top" src={recipe.image} />
      <StyledCardBody>
        <SCardTitle>{recipe.title}</SCardTitle>
        <span>
          <Link href="www.kitchen.com/recipe" target="_blank">
            www.kitchen.com
          </Link>
          {recipeSavedState ? (
            <SRButton
              size="sm"
              variant="outline-info"
              onClick={() => {
                onUnsave();
                setRecipeSavedState(false);
              }}
            >
              Saved
            </SRButton>
          ) : (
            <SRButton
              size="sm"
              variant="info"
              onClick={() => {
                onSave();
                setRecipeSavedState(true);
              }}
            >
              Save
            </SRButton>
          )}
        </span>

        <Recipe
          key={recipe.id}
          id={recipe.id}
          recipeIngredients={recipe.extendedIngredients}
          recipeMethod={recipe.analyzedInstructions}
        />
        <Button variant="primary" href={recipe.sourceUrl} target="_blank">
          Go to site
        </Button>
      </StyledCardBody>
    </SCard>
  );
};

export default RecommendedCard;
