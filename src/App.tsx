import React, { useEffect } from "react";
import styles from "./App.module.css";
import { Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, login, logout } from "./features/userSlice";
import { auth } from "./firebase";

import Feed from "./components/Feed";
import Auth from "./components/Auth";

const App = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photoUrl: authUser.photoURL,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });

    return () => {
      unSub();
    };
  }, [dispatch]);

  return (
    <div>
      <Switch>
        <Route path="/">{user.uid ? <Feed /> : <Auth />}</Route>
      </Switch>
    </div>
  );
};

export default App;
