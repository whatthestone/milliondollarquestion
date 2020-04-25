import React, { useState, useEffect } from "react";
import MDAnswer from "../components/MDAnswer";
import MDQuestion from "../components/MDQuestion";
import fakeResults from "../data/results.json";

//Using functional component
const Main = () => {
  //Stores state of variables required for fetch. Modern way of state using hooks.
  const [data, setData] = useState(null);
  const [recipe, setRecipe] = useState(null);
  const [mealType, setMealType] = useState(null);
  const [maxReadyTime, setMaxReadyTime] = useState(null);
  const [cuisine, setCuisine] = useState(null);

  //this is modern way of doing componentDidMount using hooks!
  useEffect(() => {
    //Only fetch if all not null
    if (mealType && maxReadyTime && cuisine) {
      fetch(
        `https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisine}&&maxReadyTime=${maxReadyTime}&instructionsRequired=true&type=${mealType}&apiKey=${process.env.REACT_APP_APIKEY}`
      )
        .then((res) => {
          return res.status === 404 || res.status === 401 //use fakeresults if no api key too
            ? fakeResults
            : res.json();
        })
        .then((json) => {
          let newData = {};
          newData = json || fakeResults;
          console.log(newData);
          const randomRecipe = newData.results[Math.floor(Math.random() * 10)];
          //set state of data and recipe
          setData(newData.results);
          setRecipe(randomRecipe);
          //TODO: Ask question again if no result.
        });
    }
  }, [cuisine, maxReadyTime, mealType]); //useEffect runs if any of this gets updated

  //Set state of mealType, maxReadyTime and cuisine
  const setPreference = (preference) => {
    const { mealType, maxReadyTime, cuisine } = preference;
    setMealType(mealType);
    setMaxReadyTime(maxReadyTime);
    setCuisine(cuisine);
  };

  return (
    <div>
      {recipe ? (
        <MDAnswer recipe={recipe} />
      ) : (
        <MDQuestion setPreference={setPreference} />
      )}
    </div>
  );
};

export default Main;
