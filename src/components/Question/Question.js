import classes from "./Question.module.css";

const Question = ({ question, viewQuestionHandler }) => {
  return (
    <div className={classes.card}>
      <div className={classes.cardHeader}>{question.author.name} asks:</div>
      <div className={classes.cardBody}>
        <div className={classes.avatarImg}>
          <img src={question.author.avatarURL} />
        </div>
        <div className={classes.cardText}>
          <h4>Would You Rather</h4>
          <p>{`${question.optionOne.text.substr(0, 18)}...`}</p>
          <button onClick={() => viewQuestionHandler(question.id)}>
            View Poll
          </button>
        </div>
      </div>
    </div>
  );
};

export default Question;
