import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../feature/User";
import postReducer from "../feature/Post";

const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
  },
});

export default store;
