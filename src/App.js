import React, { useState } from "react";
import firebase from "./utils/Firebase";
import "firebase/auth";
import Auth from "./pages/Auth";
import { ToastContainer } from "react-toastify";
import LoggedLayout from "./Layouts/LoggedLayout/LoggedLayout";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  firebase.auth().onAuthStateChanged((currentUser) => {
    console.log(currentUser);

    if (!currentUser?.emailVerified) {
      firebase.auth().signOut();
      setUser(null);
    } else {
      setUser(currentUser);
    }

    setLoading(false);
  });

  if (loading) {
    return null;
  }
  /* return !user ? <Auth /> : <UserLogged />; */

  return (
    <>
      {!user ? <Auth /> : <LoggedLayout user={user} />}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover={false}
      />
    </>
  );
}

export default App;
