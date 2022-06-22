import { createSlice } from "@reduxjs/toolkit";

export const storeySlice = createSlice({
  name: "storey",
  initialState: [
    {
      name: "Pavimento 0",
      level: 0,
    },
  ],
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.push({
        name: state[state.length - 1].name,
        level: state[state.length - 1].level + 50,
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment } = storeySlice.actions;

export default storeySlice.reducer;
