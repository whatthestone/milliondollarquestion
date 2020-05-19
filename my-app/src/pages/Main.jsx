import React, { useState, useEffect, useContext } from "react";
import MDAnswer from "../components/MDAnswer";
import MDQuestion from "../components/MDQuestion";
import fakeResults from "../data/results.json";
import fakeRecipe from "../data/recipe.json";

import { Context as QnContext } from "../Context/QnContext";
import { Context as PantryContext } from "../Context/PantryContext";

import { Switch, Route, Redirect, useHistory } from "react-router-dom";

//Using functional component
const Main = ({ url }) => {
  const {
    state: { data, recipe, preference, recipeId, savedRecipes },
    EditData,
    SetRecipeId,
    SetRecipe,
    EditFavRecipes,
  } = useContext(QnContext);
  const {
    state: { pantry },
  } = useContext(PantryContext);

  const [showAns, setShowAns] = useState(false);
  //for infinite scroll
  const [totalResultLength, setTotalResultLength] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  //Does all the fetch recipes.
  const fetchRecipes = (offset = 0) => {
    const { mealType, maxReadyTime, cuisine } = preference;
    return fetch(
      `https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisine}&includeIngredients=&maxReadyTime=${maxReadyTime}&instructionsRequired=true&type=${mealType}&offset=${offset}&apiKey=${process.env.REACT_APP_APIKEY}`
    ).then((res) => {
      return res.status > 300 //use fakeresults if no api key too
        ? fakeResults
        : res.json();
    });
  };

  //fetch more recipes for infinite scroll
  const fetchMoreData = () => {
    console.log(data.length, totalResultLength);
    if (data.length >= totalResultLength) {
      setHasMore(false);
      return;
    }
    const newOffset = data.length;
    setOffset(newOffset);
    fetchRecipes(newOffset).then((json) => {
      const newData = json.results;
      console.log(json);
      EditData(newData);
    });
  };

  useEffect(() => {
    const { mealType, maxReadyTime, cuisine } = preference;
    //Only fetch if all not null
    if (mealType && maxReadyTime && cuisine) {
      //string all the ingredients seperated by comma
      //TODO check why api returning zero results if stringPantry have many items. I think it only returns recipe that use all the ingredients under "includeIngredients"
      // const stringPantry = pantry.map((item) => `${item.name}`).join(",");
      fetchRecipes(0).then((json) => {
        console.log(json);
        setTotalResultLength(json.totalResults);
        let newData = {};
        newData = json.results || fakeResults.results;

        if (newData?.length > 0) {
          //set state of data
          EditData(newData);

          const randomRecipe =
            newData[Math.floor(Math.random() * newData.length)];
          SetRecipeId(randomRecipe.id);
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
          SetRecipe(json);
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

  const handleSave = () => {
    EditFavRecipes([...savedRecipes, recipe]);
  };

  const handleUnsave = () => {
    if (savedRecipes) {
      let filteredRecipes = savedRecipes.filter(
        (item) => item.id !== recipe.id
      );
      EditFavRecipes(filteredRecipes);
    }
  };

  const isSavedRecipe = savedRecipes
    ? savedRecipes.filter((item) => item.id === recipe.id).length
    : 0;

  const handleAnother = () => {
    //randomise recipe onclick another
    if (data) {
      const randomRecipe = data[Math.floor(Math.random() * data.length)];
      SetRecipe(randomRecipe);
      SetRecipeId(randomRecipe.id);
    } else {
      handleEdit(); //ask user to key in preference again
    }
  };

  //ONLY if showAns (a question is asked), redirect to ans page
  //TODO redirect user from answer to qns if recipe is null
  return (
    <div>
      {showAns && <Redirect to={{ pathname: `${url}/answer` }} />}
      <Switch>
        <Route path={`${url}/answer`}>
          <MDAnswer
            isSavedRecipe={isSavedRecipe}
            onEdit={handleEdit}
            onSave={handleSave}
            onUnsave={handleUnsave}
            onAnother={handleAnother}
            fetchMoreData={fetchMoreData}
            hasMore={hasMore}
          />
        </Route>

        <Route path={`${url}/qn`}>
          <MDQuestion />
        </Route>

        <Route exact path={`${url}`}>
          <Redirect to={{ pathname: `${url}/qn` }} />
        </Route>
      </Switch>
    </div>
  );
};

export default Main;
