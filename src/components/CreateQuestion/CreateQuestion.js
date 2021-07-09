import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import classes from "./CreateQuestion.module.css";
import { saveQuestion } from "../../store/questionSlice";
import { useHistory } from "react-router";
import { uiActions } from "../../store/uiSlice";
import { fetchUsers } from "../../store/usersSlice";

const CreateQuestion = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [isSubmiting, setIsSubmiting] = useState(false);

  const submitQuestionHandler = (e) => {
    e.preventDefault();
    setIsSubmiting(true);
    dispatch(
      saveQuestion({
        author: currentUser.id,
        optionOneText: optionOne,
        optionTwoText: optionTwo,
      })
    )
      .then(() => {
        dispatch(fetchUsers());
      })
      .then(() => {
        setTimeout(() => {
          setIsSubmiting(false);
          dispatch(uiActions.changeActiveNavTab("home"));
          history.push("/home");
        }, 200);
      });
  };
  return (
    <div className={classes.card}>
      <div className={classes.cardHeader}>Create New Question</div>
      <div className={classes.cardBody}>
        <div className={classes.cardText}>
          <h4>Would You Rather</h4>
          <form onSubmit={submitQuestionHandler}>
            <div>
              <input
                type="text"
                value={optionOne}
                onChange={(event) => {
                  setOptionOne(event.target.value);
                }}
                placeholder="Option One"
                required
              />
            </div>
            <div className={classes.orDiv}>OR</div>
            <div>
              <input
                type="text"
                value={optionTwo}
                onChange={(event) => {
                  setOptionTwo(event.target.value);
                }}
                placeholder="Option Two"
                required
              />
            </div>
            <button disabled={optionOne === "" && optionTwo === ""}>
              Submit
              {isSubmiting && <div className={classes.loadingIcon}></div>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateQuestion;
