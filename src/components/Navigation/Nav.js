import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import classes from "./Nav.module.css";
import { authActions } from "../../store/authSlice";

const Nav = (props) => {
  const history = useHistory();
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.auth.currentUser) || JSON.parse(localStorage.getItem('currentUser'))
  const [activeTab, setActiveTab] = useState('home')

  const logoutHandler = () => {
    dispatch(authActions.logout())
    history.push('/login')
  }
  
  return (
    <nav className={classes.nav}>
      {currentUser && (
        <ul>
          <li className={activeTab === 'home' && classes.activeTab}>
            <Link to="/home" onClick={() => setActiveTab('home')}>Home</Link>
          </li>
          <li className={activeTab === 'newQuestion' && classes.activeTab}>
            <Link to="/" onClick={() => setActiveTab('newQuestion')}>New Question</Link>
          </li>
          <li className={activeTab === 'leaderboard' && classes.activeTab}>
            <Link to="/" onClick={() => setActiveTab('leaderboard')}>Leaderboard</Link>
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
