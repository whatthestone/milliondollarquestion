import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MyDropdownButton from "./MyDropdownButton";
import QuestionItems from "./QuestionItems";

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

const MDQuestion = ({ setPreference }) => {
  //State for MDQuestion
  // const pref = JSON.parse(localStorage.getItem("preference"));
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

      // const rawPreference = {
      //   mealType,
      //   cuisine,
      //   difficulty,
      // };

      setPreference(preference);
    }
  }, [mealType, difficulty, cuisine, setPreference]);

  const mealTypes = [
    "breakfast",
    "main course",
    "side dish",
    "salad",
    "soup",
    "fingerfood",
    "snack",
    "dessert",
    "appetizer",
    "bread",
    "beverage",
    "sauce",
    "marinade",
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
    <div style={{ padding: "1rem" }}>
      <QuestionItems
        optionList={mealTypes}
        title={"Meal Type"}
        setOption={setMealType}
        option={mealType}
      />
      <QuestionItems
        optionList={diffTypes}
        title={"Difficulty"}
        setOption={setDifficulty}
        option={difficulty}
      />
      <QuestionItems
        optionList={cuisineTypes}
        title={"Cuisine"}
        setOption={setCuisine}
        option={cuisine}
      />
    </div>
    // <StyledContainer>
    //   <h3 style={{ textAlign: "center" }}>What shall we make today?</h3>
    //   <StyledQnContainer>
    //     <MyDropdownButton
    //       title="Meal type"
    //       optionList={mealTypes}
    //       setOption={setMealType}
    //       option={mealType}
    //     />

    //     <MyDropdownButton
    //       title="Difficulty"
    //       optionList={diffTypes}
    //       setOption={setDifficulty}
    //       option={difficulty}
    //     />
    //     <MyDropdownButton
    //       title="Cuisine"
    //       optionList={cuisineTypes}
    //       setOption={setCuisine}
    //       option={cuisine}
    //     />
    //   </StyledQnContainer>
    // </StyledContainer>
  );
};

export default MDQuestion;
