import React, { useState, useEffect, useContext } from "react";
import QuestionItems from "./QuestionItems";
import { Link } from "react-router-dom";
import { Context as QnContext } from "../Context/QnContext";

const MDQuestion = ({ ingredient }) => {
  //State for MDQuestion
  // const pref = JSON.parse(localStorage.getItem("preference"));
  const [mealType, setMealType] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [cuisine, setCuisine] = useState(null);

  const { SetPreference } = useContext(QnContext);

  useEffect(() => {
    if (mealType && difficulty && cuisine) {
      const preference = {
        mealType,
        cuisine,
        maxReadyTime:
          difficulty === "Easy" ? "20" : difficulty === "Medium" ? "40" : "60",
      };

      SetPreference(preference);
    }
  }, [mealType, difficulty, cuisine]);

  const mealTypes = [
    "breakfast",
    "main course",
    "side dish",
    // "salad",
    // "soup",
    // "fingerfood",
    "snack",
    "dessert",
    // "appetizer",
    // "bread",
    // "beverage",
    // "sauce",
    // "marinade",
    // "drink",
  ];

  const diffTypes = ["Easy", "Medium", "Challenging"];

  const cuisineTypes = [
    "American",
    "European",
    "Chinese",
    "Japanese",
    "Indian",
    "French",
    "Italian",
    "Thai",
    "Vietnamese",
    "Korean",
    "British",
    "German",
    "Greek",
    "Irish",
    // "Jewish",
    // "Latin American",
    // "Mediterranean",
    "Mexican",
    // "Middle Eastern",
    // "Nordic",
    // "Southern",
    "Spanish",
    // "African",
    // "Cajun",
    // "Caribbean",
    "Eastern European",
  ];

  return (
    <div
      style={{
        padding: "1rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "2rem",
        }}
      >
        <h3
          style={{
            color: "black",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          What are you in the mood for?
        </h3>
        {ingredient ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontWeight: "bold" }}>
              Must use{" "}
              <span
                style={{
                  color: "orange",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              >
                {ingredient}
              </span>
            </span>
            <Link to={`/main/qn`}>
              <div
                style={{
                  paddingLeft: ".5rem",
                }}
              >
                <span style={{ color: "red", cursor: "pointer" }}>remove</span>
              </div>
            </Link>
          </div>
        ) : null}
      </div>
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
  );
};

export default MDQuestion;
