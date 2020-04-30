import React from "react";
import { Card } from "react-bootstrap";
import styled from "styled-components";

const StyledCard = styled(Card)`
  width: 15rem;
  height: 10rem;
  margin: 1rem;
  cursor: pointer;
  transition: transform 0.3s;
  overflow: hidden;
`;

const StyledCardImg = styled(Card.Img)`
  width: 100%;
  height: 100%;
  filter: brightness(50%);
  transition: transform 0.3s ease-out;

  ${StyledCard}:hover & {
    transform: scale(1.2);
  }
`;

const SimiliarRecipeCard = ({ recipe, changeCard }) => {
  return (
    <StyledCard
      className="bg-dark text-white"
      onClick={() => changeCard(recipe.id)}
    >
      <StyledCardImg src={recipe.image} alt={recipe.title} />
      <Card.ImgOverlay>
        <Card.Title>{recipe.title}</Card.Title>
      </Card.ImgOverlay>
    </StyledCard>
  );
};

export default SimiliarRecipeCard;
