import { configureStore } from "@reduxjs/toolkit";
import storeyReducer from "../features/building/storey.slice";

export default configureStore({
  reducer: {
    storey: storeyReducer,
  },
});
