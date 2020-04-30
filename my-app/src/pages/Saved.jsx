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

const SUndo = styled.span`
  color: #007bff;
  text-decoration: underline;
  cursor: pointer;
`;

const SCardColumns = styled.div`
  display: flex;

  @media only screen and (max-width: 992px) {
    justify-content: center;
  }

  @media only screen and (max-width: 719px) {
    flex-wrap: wrap;
  }
`;

// const SCardColumns = styled(CardColumns)`
//   padding-top: 50px;
//   height: 100%;

//   ${media.only("sm")} {
//     column-count: 2;
//     font-size: 12px;
//   }

//   ${media.only("md")} {
//     column-count: 3;
//   }

//   ${media.only("lg")} {
//     column-count: 4;
//   }

//   ${media.only("xl")} {
//     column-count: 5;
//   }
// `;

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100vw",
        margin: 0,
      }}
    >
      <SHeader>Saved Recipes</SHeader>
      {deletedRecipes && (
        <span style={{ textAlign: "center" }}>
          Item Deleted. <SUndo onClick={handleUndo}>Undo</SUndo>
        </span>
      )}
      <SCardColumns>
        {savedRecipes &&
          savedRecipes.map((recipe, key) => (
            <SavedCard key={key} recipe={recipe} onDelete={handleDelete} />
          ))}
      </SCardColumns>
    </div>
  );
};

export default Saved;
