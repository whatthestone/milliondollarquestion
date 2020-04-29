import React from "react";
import styled from "styled-components";
import { Row, Container, Button } from "react-bootstrap";
import RecommendedCard from "../components/RecommendedCard";
import SimiliarRecipeCard from "./SimiliarRecipeCard";

const OptionSelectionWrapper = styled.div`
  text-align: center;
  width: 100%;
`;

const SButton = styled(Button)`
  margin: 5px;
`;

const Header = styled.h3`
  font-weight: 700;
  text-align: center;
`;

const SubHeader = styled.p`
  text-align: center;
`;

const StyledSRecipeBox = styled.div`
  display: flex;
  margin: auto;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;

const MDAnswer = ({ recipe, onEdit, onSave, onAnother, allRecipes, changeCard }) => {
  const SimiliarRecipes = allRecipes
    ? allRecipes
        .filter((r) => r.id != recipe.id)
        .map((r, index) => (
          <SimiliarRecipeCard key={index} recipe={r} changeCard={changeCard} />
        ))
    : null;

  return (
    <Container
      style={{ margin: "auto", marginTop: "2rem", marginBottom: "2rem" }}
    >
      <div>
        <Header>The Million Dollar Answer</Header>
        <SubHeader>This is what we suggest: </SubHeader>
      </div>
      <RecommendedCard recipe={recipe} />
      <Row>
        <OptionSelectionWrapper>
          <SButton variant="outline-primary" onClick={onEdit}>
            Edit
          </SButton>
          <SButton onClick={onSave}>SAVE</SButton>
          <SButton variant="outline-primary" onClick={onAnother}>
            Another
          </SButton>
        </OptionSelectionWrapper>
      </Row>
      {SimiliarRecipes ? (
        <div
          style={{
            marginTop: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h4>Based on your preferences, you might also like...</h4>
          {/* <p>infinite scroll</p> */}
          <StyledSRecipeBox>{SimiliarRecipes}</StyledSRecipeBox>
        </div>
      ) : null}
    </Container>
  );
};

export default MDAnswer;
