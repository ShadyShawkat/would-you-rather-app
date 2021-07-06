import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.currentUser = action.payload
      localStorage.setItem('currentUser', JSON.stringify(action.payload))
    },
    logout(state) {
      state.currentUser = null
      localStorage.removeItem('currentUser')
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
