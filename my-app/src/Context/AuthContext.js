import createDataContext from "./createDataContext";
import firebase from "firebase";

const authReducer = (state, action) => {
  switch (action.type) {
    case "signin":
      const { isSignedIn, profile } = action.payload;
      return { ...state, isSignedIn, profile };
    case "profile":
      return { ...state, profile: action.payload };

    case "signout":
      return {
        ...state,
        isSignedIn: false,
        profile: {
          name: null,
          email: null,
          uid: null,
        },
      };

    default:
      return state;
  }
};

const signin = (dispatch) => (isSignedIn) => {
  try {
    const user = firebase.auth().currentUser;

    if (user) {
      firebase
        .database()
        .ref("users/" + user.uid)
        .once("value")
        .then((snapshot) => {
          if (snapshot.val() === null) {
            firebase
              .database()
              .ref("users/" + user.uid)
              .set({
                name: user.displayName,
                email: user.email,
              });
          }
        });

      const profile = {
        name: user.displayName,
        email: user.email,
        uid: user.uid,
      };
      dispatch({ type: "signin", payload: { isSignedIn, profile } });
    }
  } catch (error) {
    console.log(error);
  }
};

const signout = (dispatch) => () => {
  try {
    firebase.auth().signOut();
    dispatch({ type: "signout" });
  } catch (error) {
    console.log(error);
  }
};

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    signin,
    signout,
  },
  {
    isSignedIn: false,
    profile: {
      name: null,
      email: null,
      uid: null,
    },
  }
);
