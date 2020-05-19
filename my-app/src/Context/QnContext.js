import createDataContext from "./createDataContext";

const saveDataLocalStorage = (newData) => {
  localStorage.setItem("allRecipes", JSON.stringify(newData));
};

const saveRecipeLocalStorage = (recipe) => {
  localStorage.setItem("recipe", JSON.stringify(recipe));
};

const saveFavLocalStorage = (favs) => {
  localStorage.setItem("savedRecipes", JSON.stringify(favs));
};

const QnReducer = (state, action) => {
  switch (action.type) {
    case "editdata":
      saveDataLocalStorage(action.payload);
      return { ...state, data: action.payload };

    case "setrecipeid":
      return { ...state, recipeId: action.payload };

    case "setrecipe":
      saveRecipeLocalStorage(action.payload);
      return { ...state, recipe: action.payload };

    case "setpreference":
      return { ...state, preference: action.payload };

    case "editfav":
      saveFavLocalStorage(action.payload);
      return { ...state, savedRecipes: action.payload };

    default:
      return state;
  }
};

const EditData = (dispatch) => (data) => {
  try {
    dispatch({
      type: "editdata",
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

const SetRecipeId = (dispatch) => (recipeId) => {
  try {
    dispatch({
      type: "setrecipeid",
      payload: recipeId,
    });
  } catch (error) {
    console.log(error);
  }
};

const SetRecipe = (dispatch) => (recipe) => {
  try {
    dispatch({
      type: "setrecipe",
      payload: recipe,
    });
  } catch (error) {}
};

const SetPreference = (dispatch) => (preference) => {
  try {
    dispatch({
      type: "setpreference",
      payload: preference,
    });
  } catch (error) {
    console.log(error);
  }
};

const EditFavRecipes = (dispatch) => (favs) => {
  try {
    dispatch({
      type: "editfav",
      payload: favs,
    });
  } catch (error) {
    console.log(error);
  }
};

export const { Provider, Context } = createDataContext(
  QnReducer,
  {
    EditData,
    SetRecipeId,
    SetRecipe,
    SetPreference,
    EditFavRecipes,
  },
  {
    data: JSON.parse(localStorage.getItem("allRecipes")) || [],
    recipe: JSON.parse(localStorage.getItem("recipe")) || [],
    recipeId: null,
    savedRecipes: JSON.parse(localStorage.getItem("savedRecipes")) || [],
    preference: {
      mealType: null,
      maxReadyTime: null,
      cuisine: null,
      recipeId: null,
    },
  }
);
