import classes from './CreateQuestion.module.css';

const CreateQuestion = () => {
    const setFormValueHandler = () => {

    }

    const submitAnswerHandler = () => {

    }
    return (
        <div className={classes.card}>
          <div className={classes.cardHeader}>Create New Question</div>
          <div className={classes.cardBody}>
            <div className={classes.cardText}>
              <h4>Would You Rather</h4>
              <form onSubmit={(e) => e.preventDefault()}>
                <div>
                  <input
                    type="text"
                    id="optionOne"
                    name="options"
                    onChange={setFormValueHandler}
                    placeholder="Option One"
                  />
                </div>
                <div className={classes.orDiv}>OR</div>
                <div>
                  <input
                    type="text"
                    id="optionTwo"
                    name="options"
                    onChange={setFormValueHandler}
                    placeholder="Option Two"
                  />
                </div>
                <button onClick={submitAnswerHandler}>Submit</button>
              </form>
            </div>
          </div>
        </div>
    )
}

export default CreateQuestion