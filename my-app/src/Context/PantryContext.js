import createDataContext from "./createDataContext";

const savePantryLocalStorage = (pantry) => {
  localStorage.setItem("pantry", JSON.stringify(pantry));
};

const pantryReducer = (state, action) => {
  switch (action.type) {
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

const AddItem = (dispatch) => ({ name, expiry, location, cat, key }) => {
  try {
    dispatch({
      type: "additem",
      payload: { name, expiry, location, cat, key },
    });
  } catch (error) {
    console.log(error);
  }
};

const DeleteItem = (dispatch) => (key) => {
  try {
    dispatch({
      type: "deleteitem",
      payload: key,
    });
  } catch (error) {
    console.log(error);
  }
};

const EditItem = (dispatch) => ({ name, expiry, location, cat, key }) => {
  try {
    dispatch({
      type: "edititem",
      payload: { name, expiry, location, cat, key },
    });
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
  },
  {
    pantry: JSON.parse(localStorage.getItem("pantry")) || [
      {
        name: "rice",
        expiry: "1587513600",
        location: "dry pantry",
        cat: "grains",
        key: "1587513600",
      },
      {
        name: "egg",
        expiry: "1588204800",
        location: "dry pantry",
        cat: "dairy & soy",
        key: "1588204800",
      },
      { name: "ham", expiry: "1588377600", location: "fridge", cat: "meat" },
      {
        name: "ice cream",
        expiry: "1588742721",
        location: "freezer",
        cat: "frozen",
        key: "1588742721",
      },
      {
        name: "cheese",
        expiry: "1588742722",
        location: "fridge",
        cat: "dairy & soy",
        key: "1588742722",
      },
      {
        name: "bacon",
        expiry: "1588742723",
        location: "fridge",
        cat: "meat",
        key: "1588742723",
      },
      {
        name: "celery",
        expiry: "1588742724",
        location: "fridge",
        cat: "vegetables",
        key: "1588742724",
      },
      {
        name: "carrots",
        expiry: "1588118400",
        location: "fridge",
        cat: "vegetables",
        key: "1588118400",
      },
    ],
  }
);
