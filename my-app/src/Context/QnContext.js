import createDataContext from "./createDataContext";
import firebase from "firebase";

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

const EditFavRecipes = (dispatch) => (favs, uid) => {
  try {
    if (uid) {
      firebase.database().ref(`users/${uid}/favrecipes`).set(favs);
    }
    dispatch({
      type: "editfav",
      payload: favs,
    });
  } catch (error) {
    console.log(error);
  }
};

const GetFavRecipes = (dispatch) => (uid) => {
  try {
    let ls_fav = JSON.parse(localStorage.getItem("savedRecipes"));
    if (uid) {
      firebase
        .database()
        .ref(`/users/${uid}/favrecipes`)
        .once("value")
        .then((snapshot) => {
          //Use fav recipes from db if it exist
          if (snapshot.val() !== null) {
            let db_fav = [];
            Object.keys(snapshot.val()).map((k) => {
              db_fav.push(snapshot.val()[k]);
              return k;
            });
            dispatch({
              type: "editfav",
              payload: db_fav,
            });
          } else {
            //if no fav in db, save localstorage fav to db.
            //use case: if user has no account initially then set up an account, we want to transfer fav over.
            if (ls_fav.length > 0) {
              firebase.database().ref(`users/${uid}/favrecipes`).set(ls_fav);
            }
          }
        });
    } else {
      dispatch({
        type: "editfav",
        payload: ls_fav,
      });
    }
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
    GetFavRecipes,
  },
  {
    data: JSON.parse(localStorage.getItem("allRecipes")) || [],
    recipe: JSON.parse(localStorage.getItem("recipe")) || [],
    recipeId: null,
    savedRecipes: [],
    preference: {
      mealType: null,
      maxReadyTime: null,
      cuisine: null,
      recipeId: null,
    },
  }
);
