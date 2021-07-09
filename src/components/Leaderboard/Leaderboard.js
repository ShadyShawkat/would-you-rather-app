import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import classes from "./Leaderboard.module.css";

let initial = true;
const Leaderboard = () => {
    const dispatch = useDispatch();
  const users = Object.values(useSelector((state) => state.users.users));
  let [usersToShow, setUsersToShow] = useState([]);

  if (!initial && usersToShow.length === 0) {
    initial = true;
  }

  useEffect(() => {
    if (users.length && initial) {
      initial = false;
      setUsersToShow(
        users.map((user) => ({
          id: user.id,
          name: user.name,
          avatarURL: user.avatarURL,
          answers: Object.keys(user.answers).length,
          questions: Object.keys(user.questions).length,
          score:
            Object.keys(user.answers).length +
            Object.keys(user.questions).length,
        }))
      );
      setUsersToShow((users) => users.sort((u1, u2) => u2.score - u1.score));
    }
  }, [users]);

  return (
    <div className={classes.main}>
      <div className={classes.header}>Leaderboard</div>
      <div className={classes.cards}>
        {usersToShow.map((user) => (
          <div key={user.id} className={classes.card}>
            <div className={classes.avatarImg}>
              <img src={user.avatarURL} />
            </div>
            <div className={classes.cardBody}>
              <div>{user.name}</div>
              <div>
                Answered questions<div>{user.answers}</div>
              </div>
              <div>
                Created questions<div>{user.questions}</div>
              </div>
            </div>
            <div className={classes.cardScore}>
              <div>Score</div>
              <div>{user.score}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
