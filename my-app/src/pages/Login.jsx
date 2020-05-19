import React, { useState, useEffect, Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const firebaseConfig = {
  apiKey: "AIzaSyCZr88pgVYVtfizS5dLwUssIspQhez0F44",
  authDomain: "milliondollarquestion-83e1d.firebaseapp.com",
  databaseURL: "https://milliondollarquestion-83e1d.firebaseio.com",
  projectId: "milliondollarquestion-83e1d",
  storageBucket: "milliondollarquestion-83e1d.appspot.com",
  messagingSenderId: "766640572413",
  appId: "1:766640572413:web:efb43df0c767fbb92c7b94",
  measurementId: "G-P5GZMQL6GX",
};

firebase.initializeApp(firebaseConfig);

export default class Login extends Component {
  // The component's Local state.
  state = {
    isSignedIn: false, // Local signed-in state.
  };

  // Configure FirebaseUI.
  uiConfig = {
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

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => this.setState({ isSignedIn: !!user }));
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    if (!this.state.isSignedIn) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem .5rem 1rem .5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: "1px solid #eeee",
              padding: "2rem",
              borderRadius: ".5rem",
            }}
          >
            <h2>Log in to enjoy more features!</h2>
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </div>
        </div>
      );
    }
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem .5rem 1rem .5rem",
        }}
      >
        <h2>
          Welcome {firebase.auth().currentUser.displayName}! You are now
          signed-in!
        </h2>
        <a
          style={{
            border: "1px solid black",
            color: "black",
            padding: ".5rem",
            borderRadius: ".5rem",
          }}
          onClick={() => firebase.auth().signOut()}
        >
          Sign out
        </a>
      </div>
    );
  }
}
//   const [isSignedIn, setIsSignedIn] = useState(false);

//   useEffect(() => {
//     const unregisterAuthObserver = firebase
//       .auth()
//       .onAuthStateChanged((user) => setIsSignedIn(!!user));

//     return () => {
//       unregisterAuthObserver();
//     };
//   }, []);

//   return (
//     <div>
//       {isSignedIn ? (
//         <a onClick={() => firebase.auth().signOut()}>Sign out</a>
//       ) : (
//         <StyledFirebaseAuth
//           uiConfig={uiConfig}
//           firebaseAuth={firebase.auth()}
//         />
//       )}
//     </div>
//   );
// }
