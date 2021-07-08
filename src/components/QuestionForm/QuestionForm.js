import classes from "./QuestionForm.module.css";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const QuestionForm = () => {
  const { id: questionId } = useParams();
  const allQuestions = Object.values(
    useSelector((state) => state.questions.questions)
  );
  const currentUser = useSelector((state) => state.auth.currentUser);
  const users = Object.values(useSelector((state) => state.users.users));

  const [formValue, setFormValue] = useState('optionOne');
  const [dataLoaded, setDataLoaded] = useState(false);

  const question = {};
  Object.assign(
    question,
    allQuestions.find((question) => question.id === questionId)
  );
  question.author = users.find((user) => user.id === question.author);

  const submitAnswerHandler = (event) => {
      event.preventDefault();
      console.log(formValue)
  };

  const setFormValueHandler = (event) => {
      setFormValue(event.target.value)
  }

  useEffect(() => {
    if (users.length > 0 && allQuestions.length > 0) {
      setDataLoaded(true);
    }
  }, [allQuestions, users]);

  return (
    <div>
      {!dataLoaded && (
        <div style={{ textAlign: "center" }}>
          <div className={classes.loadingRing}></div>
        </div>
      )}
      {dataLoaded && (
        <div className={classes.card}>
          <div className={classes.cardHeader}>{question.author.name} asks:</div>
          <div className={classes.cardBody}>
            <div className={classes.avatarImg}>
              <img src={question.author.avatarURL} />
            </div>
            <div className={classes.cardText}>
              <h4>Would You Rather</h4>
              <form onSubmit={submitAnswerHandler}>
                <div>
                  <input
                    type="radio"
                    id="optionOne"
                    name="options"
                    value="optionOne"
                    checked={formValue === 'optionOne'}
                    onChange={setFormValueHandler}
                  />
                  <label for="optionOne">{question.optionOne.text}</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="optionTwo"
                    name="options"
                    value="optionTwo"
                    checked={formValue === 'optionTwo'}
                    onChange={setFormValueHandler}
                  />
                  <label for="optionTwo">{question.optionTwo.text}</label>
                </div>
                <button>Submit</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionForm;
