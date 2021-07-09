import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeNavTab: 'home',
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    changeActiveNavTab(state, action) {
      state.activeNavTab = action.payload
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
