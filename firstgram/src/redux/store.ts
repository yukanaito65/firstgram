import { configureStore } from "@reduxjs/toolkit";
import { followerCount } from "./followerCountSlice";

export const store = configureStore ({
  reducer : {
    followerCountSlice: followerCount,
  },
})
