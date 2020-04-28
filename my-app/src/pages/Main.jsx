import React, { useState, useEffect } from "react";
import MDAnswer from "../components/MDAnswer";
import MDQuestion from "../components/MDQuestion";
import fakeResults from "../data/results.json";
import fakeRecipe from "../data/recipe.json";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
} from "react-router-dom";

//Using functional component
const Main = ({ url }) => {
  //Stores state of variables required for fetch. Modern way of state using hooks.
  const [data, setData] = useState(null);
  const [recipe, setRecipe] = useState(
    JSON.parse(localStorage.getItem("recipe")) || null
  );
  const [recipeId, setRecipeId] = useState(null);
  const [preference, setPreference] = useState({
    mealType: null,
    maxReadyTime: null,
    cuisine: null,
  });

  const [pantry] = useState(JSON.parse(localStorage.getItem("pantry")) || []);
  const [showAns, setShowAns] = useState(null);

  useEffect(() => {
    const { mealType, maxReadyTime, cuisine } = preference;
    //Only fetch if all not null
    if (mealType && maxReadyTime && cuisine) {
      //string all the ingredients seperated by comma
      //TODO check why api returning zero results if stringPantry have many items. I think it only returns recipe that use all the ingredients under "includeIngredients"
      const stringPantry = pantry.map((item) => `${item.name}`).join(",");
      fetch(
        `https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisine}&includeIngredients=&maxReadyTime=${maxReadyTime}&instructionsRequired=true&type=${mealType}&apiKey=${process.env.REACT_APP_APIKEY}`
      )
        .then((res) => {
          return res.status > 300 //use fakeresults if no api key too
            ? fakeResults
            : res.json();
        })
        .then((json) => {
          let newData = {};
          newData = json.results || fakeResults.results;
          // console.log(newData);
          //set state of data
          setData(newData);

          if (newData?.length > 0) {
            const randomRecipe =
              newData[Math.floor(Math.random() * newData.length)];
            setRecipeId(randomRecipe.id);
          }
          //TODO: Ask question again if no result.
        });
    }
  }, [preference]);

  //fetch recipe information if recipeid gets updated.
  useEffect(() => {
    //only fetch when recipeId is != null. Without this, fakerecipe overwrites cache recipe on start.
    if (recipeId) {
      fetch(
        `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=${process.env.REACT_APP_APIKEY}`
      )
        .then((res) => {
          return res.status > 300 ? fakeRecipe : res.json();
        })
        .then((json) => {
          setRecipe(json);
          localStorage.setItem("recipe", JSON.stringify(json));
          setShowAns(true);
        });
    }
  }, [recipeId]);

  const history = useHistory();
  const handleEdit = () => {
    history.push(`${url}/qn`);
    //Set to question screen when edit button is clicked
    setShowAns(false);
  };

  //ONLY if showAns (a question is asked), redirect to ans page
  return (
    <div>
      {showAns && <Redirect to={{ pathname: `${url}/answer` }} />}
      <Switch>
        <Route path={`${url}/answer`}>
          <MDAnswer recipe={recipe} onEdit={handleEdit} />
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
