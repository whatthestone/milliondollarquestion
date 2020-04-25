import React, { Component, useState } from "react";
import styled from "styled-components";
import { Dropdown, DropdownButton } from "react-bootstrap";
import MyDropdownButton from "./MyDropdownButton";
import MyDropdownButon from "./MyDropdownButton";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledQnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 2rem;
`;

const MDQuestion = () => {
  const mealTypes = [
    "main course",
    "side dish",
    "dessert",
    "appetizer",
    "salad",
    "bread",
    "breakfast",
    "soup",
    "beverage",
    "sauce",
    "marinade",
    "fingerfood",
    "snack",
    "drink",
  ];

  const diffTypes = ["Easy", "Medium", "Challenging"];

  const cuisineTypes = [
    "African",
    "American",
    "British",
    "Cajun",
    "Caribbean",
    "Chinese",
    "Eastern European",
    "European",
    "French",
    "German",
    "Greek",
    "Indian",
    "Irish",
    "Italian",
    "Japanese",
    "Jewish",
    "Korean",
    "Latin American",
    "Mediterranean",
    "Mexican",
    "Middle Eastern",
    "Nordic",
    "Southern",
    "Spanish",
    "Thai",
    "Vietnamese",
  ];

  const [mealType, setMealType] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [cuisine, setCuisine] = useState(null);

  return (
    <StyledContainer>
      <h3>What kind of recipe are you looking for?</h3>
      <StyledQnContainer>
        <MyDropdownButon
          title="Meal type"
          optionList={mealTypes}
          setOption={setMealType}
          option={mealType}
        />
        <MyDropdownButon
          title="Difficulty"
          optionList={diffTypes}
          setOption={setDifficulty}
          option={difficulty}
        />
        <MyDropdownButon
          title="Cuisine"
          optionList={cuisineTypes}
          setOption={setCuisine}
          option={cuisine}
        />
      </StyledQnContainer>
    </StyledContainer>
  );
};

export default MDQuestion;
