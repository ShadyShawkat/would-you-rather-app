import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import classes from "./Nav.module.css";
import { authActions } from "../../store/authSlice";
import { uiActions } from "../../store/uiSlice";

const Nav = () => {
  const history = useHistory();
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.auth.currentUser) || JSON.parse(localStorage.getItem('currentUser'))
  const activeTab = useSelector((state) => state.ui.activeNavTab)

  const logoutHandler = () => {
    dispatch(authActions.logout())
    history.push('/login')
  }

  const changeNavTabHandler = (newTab) => {
    dispatch(uiActions.changeActiveNavTab(newTab))
  }
  
  return (
    <nav className={classes.nav}>
      {currentUser && (
        <ul>
          <li className={ activeTab === 'home' && classes.activeTab}>
            <Link to="/home" onClick={() => changeNavTabHandler('home')}>Home</Link>
          </li>
          <li className={activeTab === 'newQuestion' && classes.activeTab}>
            <Link to="/question/create" onClick={() => changeNavTabHandler('newQuestion')}>New Question</Link>
          </li>
          <li className={activeTab === 'leaderboard' && classes.activeTab}>
            <Link to="/leaderboard" onClick={() => changeNavTabHandler('leaderboard')}>Leaderboard</Link>
          </li>
          <li>
            <span>
              Hello <b>{currentUser.name}</b>
            </span>
            <img src={currentUser.avatarURL} />
            <button onClick={logoutHandler}>Logout</button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Nav;
