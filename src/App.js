import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, Router } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Nav from "./components/Navigation/Nav";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import Home from "./components/Home/Home";
import { fetchUsers } from "./store/usersSlice";
import { authActions } from "./store/authSlice"

function App() {
  const dispatch = useDispatch();
  const currentUser =
    useSelector((state) => state.auth.currentUser) ||
    JSON.parse(localStorage.getItem("currentUser"));

  if (currentUser) {
    dispatch(authActions.login(currentUser));
  }

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <React.Fragment>
      <Nav />
      {currentUser ? (
        <Switch>
          <Route path={["/", "/home"]} exact>
            <Home />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      ) : (
        <Redirect to="/login" />
      )}
      {/* <Route path={["/", "/login", "/home"]} exact> */}
      {!currentUser && (
        <Route path="/login" exact>
          <Login />
        </Route>
      )}

      {/* <Route path="*">
        <NotFound />
      </Route> */}
    </React.Fragment>
  );
}

export default App;
