import { createSlice } from "@reduxjs/toolkit";
import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from "../_DATA";

const initialState = {
  questions: {},
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    getQuestion(state, action) {
      state.questions = action.payload;
    },
  },
});

export const fetchQuestions = () => {
  return async (dispatch) => {
    _getQuestions().then((data) =>
      dispatch(questionSlice.actions.getQuestion(data))
    );
  };
};

export const answerQuestion = (question) => {
  return async (dispatch) => {
    return _saveQuestionAnswer(question)
      .then(() => _getQuestions())
      .then((data) => dispatch(questionSlice.actions.getQuestion(data)));
  };
};

export const saveQuestion = (question) => {
  return async (dispatch) => {
    return _saveQuestion(question)
      .then(() => _getQuestions())
      .then((data) => dispatch(questionSlice.actions.getQuestion(data)));
  };
};

export const questionActions = questionSlice.actions;
export default questionSlice.reducer;
