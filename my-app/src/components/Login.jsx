import React, { useEffect, useContext } from "react";
import { Context as AuthContext } from "../Context/AuthContext";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

export default function Login() {
  const {
    state: { profile, isSignedIn },
    signin,
    signout,
  } = useContext(AuthContext);

  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
    },
  };

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => signin(!!user));
    return () => {
      unregisterAuthObserver();
    };
  }, []);

  return (
    <div>
      {!isSignedIn ? (
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      ) : (
        <div>
          <span style={{ marginRight: "1rem", color: "white" }}>
            Hi {profile.name}!
          </span>
          <span
            style={{
              border: "1px solid white",
              color: "white",
              padding: ".5rem",
              borderRadius: ".5rem",
              cursor: "pointer",
            }}
            onClick={signout}
          >
            Sign out
          </span>
        </div>
      )}
    </div>
  );
}
