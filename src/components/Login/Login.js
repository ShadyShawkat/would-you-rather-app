import classes from "./Login.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { authActions } from "../../store/authSlice";

let initial = true;

const Login = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const users = useSelector((state) => state.users.users);
  const [isSelectOptionLoaded, setIsSelectOptionLoaded] = useState(false);
  const [selectedOption, setSelectedOption] = useState("default");

  const changeSelectionHandler = (event) => {
    setSelectedOption(event.target.value);
  };

  const loginHandler = () => {
    dispatch(authActions.login(Object.values(users).find(user => user.id === selectedOption)))
    history.push('/home')
  }

  useEffect(() => {
    if (initial) {
      initial = false;
      return;
    }

    if (users) {
      setIsSelectOptionLoaded(true);
    }
  }, [users]);

  return (
    <main className={classes.auth}>
      <div>
        <b>Welcome to the would you rather app!</b>
        <br />
        please sign in to continue
      </div>
      <section>
        <img src="redux-react.png" className={classes.logo} />
        <p>Sign in</p>
        <select value={selectedOption} onChange={changeSelectionHandler}>
          {isSelectOptionLoaded && (
            <option value="default" style={{ display: "none" }}>
              Select User
            </option>
          )}
          {!isSelectOptionLoaded && (
            <option value="default" style={{ display: "none" }}>
              Getting Users...
            </option>
          )}
          {Object.values(users).map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        <button disabled={selectedOption === "default"} onClick={loginHandler}>
          Sign in
        </button>
      </section>
    </main>
  );
};

export default Login;
