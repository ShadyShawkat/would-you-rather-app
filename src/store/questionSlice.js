import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    questions = {}
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
  },
});

export const questionActions = questionSlice.actions;
export default questionSlice.reducer;
