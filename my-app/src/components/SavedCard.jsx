import React, { useState } from "react";
import styled from "styled-components";
import mediaHelper from "styled-media-helper";

import { Container, Card, CardColumns, Button } from "react-bootstrap";

const media = mediaHelper({
  sm: 320,
  md: 768,
  lg: 992,
  xl: 1200,
});

const SCard = styled(Card)`
  display: flex;
  justify-content: center;
  height: auto;

  @media only screen and (max-width: 479px) {
    width: 100%;
    padding: 1rem;
  }
`;

const SCardText = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
`;

const SCardTitle = styled(Card.Title)`
  ${media.only("sm")} {
    font-size: 16px;
  }
`;

const Subheader = styled.div`
  font-weight: 500;
  padding-top: 5px;
  padding-bottom: 5px;

  ${media.only("sm")} {
    font-size: 14px;
  }
`;

const OButton = styled(Button)`
  position: absolute;
  top: 5px;
  left: 5px;
  z-index: 10;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-0.5rem);
  transition: opacity 0.5s, transform 0.5s;

  ${SCard}:hover & {
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
  }
`;

const SavedCard = ({ recipe, onDelete }) => {
  return (
    <SCard>
      <OButton variant="danger" size="sm" onClick={() => onDelete(recipe)}>
        Delete
      </OButton>
      <Card.Img variant="top" src={recipe.image} />
      <Card.Body>
        <SCardTitle>{recipe.title}</SCardTitle>
        <SCardText style={{ maxLines: "5" }}>
          <Subheader>Ingredients: </Subheader>
          {recipe.extendedIngredients &&
            recipe.extendedIngredients.map((ingredient, index) =>
              index ? `, ${ingredient.name}` : `${ingredient.name}`
            )}
        </SCardText>
      </Card.Body>
      <div style={{ marginTop: "auto", marginBottom: 0, padding: "1rem" }}>
        <Button size="sm" block href={recipe.sourceUrl}>
          See recipe
        </Button>
      </div>
    </SCard>
  );
};

export default SavedCard;
