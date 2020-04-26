import React, { useState, useEffect } from "react";
import styled from "styled-components";
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

const MDQuestion = ({ setPreference, setShowAns }) => {
  //State for MDQuestion
  const pref = JSON.parse(localStorage.getItem("preference"));
  const [mealType, setMealType] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [cuisine, setCuisine] = useState(null);

  useEffect(() => {
    if (mealType && difficulty && cuisine) {
      const preference = {
        mealType,
        cuisine,
        maxReadyTime:
          difficulty === "Easy" ? "20" : difficulty === "Medium" ? "40" : "60",
      };

      const rawPreference = {
        mealType,
        cuisine,
        difficulty
      };

      setPreference(preference);
      setShowAns(true);
      // localStorage.setItem("preference", JSON.stringify(rawPreference));
    }
  }, [mealType, difficulty, cuisine]);

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

  return (
    <StyledContainer>
      <h3>What are you feeling today?</h3>
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
