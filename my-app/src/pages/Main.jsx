import React, { useState, useEffect } from "react";
import MDAnswer from "../components/MDAnswer";
import MDQuestion from "../components/MDQuestion";
import fakeResults from "../data/results.json";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

//Using functional component
const Main = ({ url }) => {
  //Stores state of variables required for fetch. Modern way of state using hooks.
  const [data, setData] = useState(null);
  //If recipeid in localstorage initialise it
  const [recipeId, setRecipeId] = useState(
    localStorage.getItem("recipeId") || null
  );
  const [preference, setPreference] = useState({
    mealType: null,
    maxReadyTime: null,
    cuisine: null,
  });
  const [showAns, setShowAns] = useState(false);

  const [pantry] = useState(JSON.parse(localStorage.getItem("pantry")) || []);

  useEffect(() => {
    //Only fetch if all not null
    const { mealType, maxReadyTime, cuisine } = preference;

    if (mealType && maxReadyTime && cuisine) {
      //string all the ingredients seperated by comma
      //TODO check why api returning zero results if stringPantry have many items. I think it only returns recipe that use all the ingredients under "includeIngredients"
      const stringPantry = pantry.map((item) => `${item.name}`).join(",");
      console.log(stringPantry);
      fetch(
        `https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisine}&includeIngredients=${stringPantry}&maxReadyTime=${maxReadyTime}&instructionsRequired=true&type=${mealType}&apiKey=${process.env.REACT_APP_APIKEY}`
      )
        .then((res) => {
          return res.status > 300 //use fakeresults if no api key too
            ? fakeResults
            : res.json();
        })
        .then((json) => {
          let newData = {};
          newData = json || fakeResults;
          console.log(newData);
          //set state of data
          setData(newData.results);
          setShowAns(true);
          //TODO: Ask question again if no result.
        });
    }
  }, [preference]);

  //Update recipe if data !=null and length > 0
  useEffect(() => {
    if (data?.length > 0) {
      const randomRecipe = data[Math.floor(Math.random() * data.length)];
      setRecipeId(randomRecipe.id);
      //Store recipeId in localstorage
      localStorage.setItem("recipeId", randomRecipe.id);
    }
  }, [data]);

  //ONLY if showAns (a question is asked), redirect to ans page
  return (
    <div>
      {showAns ? (
        <Redirect to={{ pathname: `${url}/answer` }} />
      ) : (
        <Redirect to={{ pathname: `${url}/qn` }} />
      )}
      <Switch>
        <Route path={`${url}/answer`}>
          <MDAnswer recipeId={recipeId} onEdit={() => setShowAns(false)} />
        </Route>

        <Route path={`${url}/qn`}>
          <MDQuestion setPreference={setPreference} />
        </Route>

        <Route exact path={`${url}`}>
          <Redirect to={{ pathname: `${url}/qn` }} />
        </Route>
      </Switch>
    </div>
  );
};

export default Main;
