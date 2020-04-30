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
`;

const SavedCard = ({ recipe, onDelete }) => {
  const [cardHover, setCardHover] = useState(false);

  const handleMouseEnter = () => {
    setCardHover(true);
  };

  const handleMouseLeave = () => {
    setCardHover(false);
  };

  return (
    <Card
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {cardHover && <OButton variant="danger" onClick={() => onDelete(recipe)}>Delete</OButton>}
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
        <Button
          style={{ marginTop: "10px" }}
          size="sm"
          block
          href={recipe.sourceUrl}
        >
          See recipe
        </Button>
      </Card.Body>
    </Card>
  );
};

export default SavedCard;
