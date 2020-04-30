import React, { useState } from "react";
import styled from "styled-components";
import mediaHelper from "styled-media-helper";
import { Container, Card, CardColumns, Button } from "react-bootstrap";
import SavedCard from "../components/SavedCard";

const media = mediaHelper({
  sm: 320,
  md: 768,
  lg: 992,
  xl: 1200,
});

const SCardColumns = styled(CardColumns)`
  padding-top: 50px;

  ${media.only("sm")} {
    column-count: 2;
    font-size: 12px;
  }

  ${media.only("md")} {
    column-count: 3;
  }

  ${media.only("lg")} {
    column-count: 4;
  }

  ${media.only("xl")} {
    column-count: 5;
  }
`;

const SHeader = styled.h3`
  padding-top: 30px;
  font-weight: 700 !important;
  text-align: center;

  ${media.only("sm")} {
    font-size: 20px;
  }
`;

const Saved = () => {
  const [savedRecipes, setSavedRecipes] = useState(
    JSON.parse(localStorage.getItem("savedRecipes"))
  );

  const [deletedRecipes, setDeletedRecipes] = useState(null);

  const handleDelete = (recipe) => {
    console.log(recipe);
    let savedRecipes = [];
    if (localStorage.getItem("savedRecipes")) {
      setDeletedRecipes(localStorage.getItem("savedRecipes"));
      const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes"));
      let filteredRecipes = savedRecipes.filter(
        (item) => item.id !== recipe.id
      );
      console.log(filteredRecipes);
      localStorage.setItem("savedRecipes", JSON.stringify(filteredRecipes));
      setSavedRecipes(filteredRecipes);
    }
  };

  const handleUndo = () => {
    localStorage.setItem("savedRecipes", deletedRecipes);
    setSavedRecipes(JSON.parse(deletedRecipes));
    setDeletedRecipes(null);
  };

  return (
    <Container>
      <SHeader>Saved Recipes</SHeader>
      {deletedRecipes && <Button onClick={handleUndo}>Undo</Button>}
      <SCardColumns>
        {savedRecipes &&
          savedRecipes.map((recipe, key) => (
            <SavedCard key={key} recipe={recipe} onDelete={handleDelete} />
          ))}
      </SCardColumns>
    </Container>
  );
};

export default Saved;
