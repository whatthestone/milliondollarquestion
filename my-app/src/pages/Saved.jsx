import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import mediaHelper from "styled-media-helper";
import { Container, Card, CardColumns, Button } from "react-bootstrap";
import SavedCard from "../components/SavedCard";
import { Context as QnContext } from "../Context/QnContext";
import { Context as AuthContext } from "../Context/AuthContext";

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

// const SCardColumns = styled.div`
//   display: flex;
//   flex-wrap: wrap;

//   @media only screen and (max-width: 992px) {
//     justify-content: center;
//   }
// `;

const SCardColumns = styled(CardColumns)`
  padding-top: 50px;
  height: 100%;

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
  const {
    state: { savedRecipes },
    EditFavRecipes,
    GetFavRecipes,
  } = useContext(QnContext);
  const {
    state: { profile },
  } = useContext(AuthContext);

  const [deletedRecipes, setDeletedRecipes] = useState(null);

  useEffect(() => {
    GetFavRecipes(profile.uid);
  }, [profile]);

  const handleDelete = (recipe) => {
    if (savedRecipes) {
      setDeletedRecipes(savedRecipes);
      let filteredRecipes = savedRecipes.filter(
        (item) => item.id !== recipe.id
      );
      EditFavRecipes(filteredRecipes, profile.uid);
    }
  };

  const handleUndo = () => {
    EditFavRecipes(deletedRecipes, profile.uid);
    setDeletedRecipes(null);
  };

  return (
    <Container style={{ height: "200vh" }}>
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
    </Container>
  );
};

export default Saved;
