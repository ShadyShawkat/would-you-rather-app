import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import classes from "./Home.module.css";
import Question from "../Question/Question";

let inital = true;
const Home = () => {
  const history = useHistory();
  const [activeTab, SetActiveTab] = useState("unanswered");
  const [questionsToShow, setQuestionsToShow] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const users = Object.values(useSelector((state) => state.users.users));

  const currentUser = useSelector((state) => state.auth.currentUser);

  const allQuestions = Object.values(
    useSelector((state) => state.questions.questions)
  );
  allQuestions.sort((q1, q2) => q2.timestamp - q1.timestamp);

  const allQuestionsWithUsersInfo = allQuestions.map((q) => {
    const question = {};
    Object.assign(question, q);
    question.author = users.find((user) => user.id === question.author);
    return question;
  });

  const viewQuestionHandler = (questionId) => {
    if (activeTab === "unanswered") {
      history.push(`./question/${questionId}`);
    } else {
      history.push(`./question/details/${questionId}`);
    }
  };

  const getQuestionsForSelectedTab = () => {
    const answeredQuestion = [];
    const unansweredQuestion = [];

    allQuestionsWithUsersInfo.map((question) => {
      if (
        question.optionOne.votes.includes(currentUser.id) ||
        question.optionTwo.votes.includes(currentUser.id)
      ) {
        answeredQuestion.push(question);
      } else {
        unansweredQuestion.push(question);
      }
    });

    if (activeTab === "unanswered") {
      setQuestionsToShow(unansweredQuestion);
    } else {
      setQuestionsToShow(answeredQuestion);
    }
  };


  useEffect(() => {
    if (users.length > 0 && allQuestions.length > 0 && inital) {
      inital = false;
      setDataLoaded(true);
      getQuestionsForSelectedTab();
    }
  }, [users, allQuestions, getQuestionsForSelectedTab]);

  useEffect(() => {
    inital = true;
    getQuestionsForSelectedTab();
  }, [activeTab]);
  return (
    <div className={classes.main}>
      <div className={classes.header}>
        <ul>
          <a
            className={activeTab === "unanswered" && classes.activeTab}
            onClick={() => SetActiveTab("unanswered")}
          >
            <li>Unanswered Questions</li>
          </a>
          <a
            className={activeTab === "answered" && classes.activeTab}
            onClick={() => SetActiveTab("answered")}
          >
            <li>Answered Questions</li>
          </a>
        </ul>
      </div>
      <div className={classes.cards}>
        {!dataLoaded && (
          <div style={{ textAlign: "center" }}>
            <div className={classes.loadingRing}></div>
          </div>
        )}
        {dataLoaded && questionsToShow.length === 0 && (
          <div className={classes.noQuestions}>No Questions Here</div>
        )}
        {questionsToShow.map((question) => (
          <Question
            key={question.id}
            question={question}
            viewQuestionHandler={viewQuestionHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
