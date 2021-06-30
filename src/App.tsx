import React, { useEffect } from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, login, logout } from "./features/userSlice";
import { auth } from "./firebase";

import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import Auth from "./components/Auth";
import ResetPassword from "./components/ResetPassword";
import Profile from "./components/Profile";

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
    <Switch>
      {user.uid ? (
        <div className="app">
          <Sidebar />
          <Route exact path="/">
            <Feed />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </div>
      ) : (
        <>
          <Route exact path="/">
            <Auth />
          </Route>
          <Route path="/reset_password">
            <ResetPassword />
          </Route>
        </>
      )}
    </Switch>
  );
};

export default App;
