import { useParams, useHistory } from "react-router";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import classes from "./QuestionDetails.module.css";

const QuestionDetails = () => {
  const history = useHistory();
  const { id: questionId } = useParams();
  const allQuestions = Object.values(
    useSelector((state) => state.questions.questions)
  );
  const currentUser = useSelector((state) => state.auth.currentUser);

  const users = Object.values(useSelector((state) => state.users.users));

  const [dataLoaded, setDataLoaded] = useState(false);

  const question = {};
  Object.assign(
    question,
    allQuestions.find((question) => question.id === questionId)
  );
  question.author = users.find((user) => user.id === question.author);

  useEffect(() => {
    if (users.length > 0 && allQuestions.length > 0) {
      setDataLoaded(true);
      if(!Object.values(allQuestions).find(q => q.id === question.id)) {
        history.push('/notFound')
      }
    }
  }, [allQuestions, users]);

  console.log(allQuestions)

  return (
    <div>
      {!dataLoaded && (
        <div style={{ textAlign: "center" }}>
          <div className={classes.loadingRing}></div>
        </div>
      )}
      {dataLoaded && (
        <div className={classes.card}>
          <div className={classes.cardHeader}>
            Asked by {question.author.name}:
          </div>
          <div className={classes.cardBody}>
            <div className={classes.avatarImg}>
              <img src={question.author.avatarURL} />
            </div>
            <div className={classes.cardText}>
              <h4>Results:</h4>
              <div
                className={
                  (classes.optionOne,
                  question.optionOne.votes.includes(currentUser.id) &&
                    classes.voted)
                }
              >
                Would you rather {question.optionOne.text}?
                <div className={classes.progressBar}>
                  <div
                    style={{
                      width: `${
                        (question.optionOne.votes.length /
                          (question.optionOne.votes.length +
                            question.optionTwo.votes.length)) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
                <div className={classes.voteRatioText}>
                  {question.optionOne.votes.length} out of{" "}
                  {question.optionOne.votes.length +
                    question.optionTwo.votes.length}{" "}
                  votes
                </div>
              </div>
              <div
                className={
                  (question.optionTwo.votes.includes(currentUser.id) &&
                    classes.voted)
                }
              >
                Would you rather {question.optionTwo.text}?
                <div className={classes.progressBar}>
                  <div
                    style={{
                      width: `${
                        (question.optionTwo.votes.length /
                          (question.optionOne.votes.length +
                            question.optionTwo.votes.length)) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
                <div className={classes.voteRatioText}>
                  {question.optionTwo.votes.length} out of{" "}
                  {question.optionOne.votes.length +
                    question.optionTwo.votes.length}{" "}
                  votes
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionDetails;
