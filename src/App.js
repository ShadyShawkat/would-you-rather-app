import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Nav from "./components/Navigation/Nav";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import Home from "./components/Home/Home";
import QuestionDetails from "./components/QuestionDetails/QuestionDetails";
import QuestionForm from "./components/QuestionForm/QuestionForm";
import CreateQuestion from "./components/CreateQuestion/CreateQuestion";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import { fetchUsers } from "./store/usersSlice";
import { fetchQuestions } from "./store/questionSlice";
import { authActions } from "./store/authSlice";

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser) 
    // || JSON.parse(localStorage.getItem("currentUser"));

  if (currentUser) {
    dispatch(authActions.login(currentUser));
  }

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchQuestions());
  })

  if (window.performance) {
    if (performance.navigation.type !== 1 && !currentUser) {
      const href = window.location.href.split('/').splice(3).map(u => `/${u}`).join('')
      localStorage.setItem('goTo', href)
    }
  }

  return (
    <React.Fragment>
      <Nav />
      {currentUser ? (
        <Switch>
          <Route path={["/", "/home"]} exact>
            <Home />
          </Route>
          <Route path="/question/create" exact>
            <CreateQuestion />
          </Route>
          <Route path="/question/:id" exact>
            <QuestionForm />
          </Route>
          <Route path="/question/details/:id" exact>
            <QuestionDetails />
          </Route>
          <Route path="/leaderboard">
            <Leaderboard />
          </Route>
          <Route path={["/notfound", "*"]}>
            <NotFound />
          </Route>
        </Switch>
      ) : (
        <Redirect to="/login"/>
      )}
      {!currentUser && (
        <Route path="/login" exact>
          <Login />
        </Route>
      )}
    </React.Fragment>
  );
}

export default App;
