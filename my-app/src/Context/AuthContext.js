import createDataContext from "./createDataContext";

const authReducer = (state, action) => {
  switch (action.type) {
    case "signin":
      const { isSignedIn } = action.payload;
      return { ...state, isSignedIn };
    case "username":
      const { username } = action.payload;
      return { ...state, username };

    default:
      return state;
  }
};

const signin = (dispatch) => (isSignedIn) => {
  try {
    dispatch({ type: "signin", payload: { isSignedIn } });
  } catch (error) {
    console.log(error);
  }
};

const setUsername = (dispatch) => (username) => {
  try {
    dispatch({ type: "username", payload: { username } });
  } catch (error) {
    console.log(error);
  }
};

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    signin,
    setUsername,
  },
  {
    isSignedIn: false,
    username: "",
  }
);
