import createDataContext from "./createDataContext";
import firebase from "firebase";

const savePantryLocalStorage = (pantry) => {
  localStorage.setItem("pantry", JSON.stringify(pantry));
};

const pantryReducer = (state, action) => {
  switch (action.type) {
    case "getpantry":
      savePantryLocalStorage(action.payload);
      return { ...state, pantry: action.payload };
    case "additem":
      const newPantry_add = [...state.pantry, action.payload];
      savePantryLocalStorage(newPantry_add);
      return { ...state, pantry: newPantry_add };

    case "deleteitem":
      const newPantry_del = state.pantry.filter(
        (item) => item.key !== action.payload
      );
      savePantryLocalStorage(newPantry_del);
      return { ...state, pantry: newPantry_del };

    case "edititem":
      const newPantry_edit = state.pantry.map((item) =>
        item.key === action.payload.key ? action.payload : item
      );
      savePantryLocalStorage(newPantry_edit);
      return { ...state, pantry: newPantry_edit };

    default:
      return state;
  }
};

const AddItem = (dispatch) => ({ uid, name, expiry, location, cat }) => {
  try {
    let newItemKey = firebase.database().ref().child("pantry").push().key; //generates random key

    const newItem = {
      name,
      expiry,
      location,
      cat,
      key: newItemKey,
    };

    if (uid) {
      let updates = {};
      updates[`/users/${uid}/pantry/${newItemKey}`] = newItem;
      firebase.database().ref().update(updates);
      //   let newItemRef = firebase.database().ref(`/users/${uid}/pantry`).push();
      //   newItemRef.set(newItem);
    }

    dispatch({
      type: "additem",
      payload: newItem,
    });
  } catch (error) {
    console.log(error);
  }
};

const DeleteItem = (dispatch) => (key, uid) => {
  try {
    if (uid) {
      firebase.database().ref(`/users/${uid}/pantry/${key}`).remove();
    }
    dispatch({
      type: "deleteitem",
      payload: key,
    });
  } catch (error) {
    console.log(error);
  }
};

const EditItem = (dispatch) => ({ uid, name, expiry, location, cat, key }) => {
  try {
    const editedItem = { name, expiry, location, cat, key };

    if (uid) {
      firebase.database().ref(`/users/${uid}/pantry/${key}`).update(editedItem);
    }
    dispatch({
      type: "edititem",
      payload: editedItem,
    });
  } catch (error) {
    console.log(error);
  }
};

const GetPantry = (dispatch) => (uid) => {
  try {
    let ls_pantry = JSON.parse(localStorage.getItem("pantry")) || [];
    if (uid) {
      firebase
        .database()
        .ref(`/users/${uid}/pantry`)
        .once("value")
        .then((snapshot) => {
          //Use pantry from db if it exist
          if (snapshot.val() !== null) {
            let db_Pantry = [];
            Object.keys(snapshot.val()).map((k) => {
              db_Pantry.push(snapshot.val()[k]);
              return k;
            });
            dispatch({
              type: "getpantry",
              payload: db_Pantry,
            });
          } else {
            //if no pantry in db, save localstorage pantry to db.
            //use case: if user has no account initially then set up an account, we want to transfer pantry over.
            if (ls_pantry.length > 0) {
              let updates = {};
              ls_pantry.map((item) => {
                updates[`/users/${uid}/pantry/${item.key}`] = item;
                firebase.database().ref().update(updates);
                return item;
              });
            }
          }
        });
    } else {
      dispatch({
        type: "getpantry",
        payload: ls_pantry,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const { Provider, Context } = createDataContext(
  pantryReducer,
  {
    AddItem,
    DeleteItem,
    EditItem,
    GetPantry,
  },
  {
    pantry: [],
  }
);
