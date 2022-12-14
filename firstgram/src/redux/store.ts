import { configureStore } from "@reduxjs/toolkit";
import { followerCount } from "./followerCountSlice";
import {loginUserSlice} from "./loginUserSlice";

export const store = configureStore ({
  reducer : {
    followerCountSlice: followerCount,
    loginUser:loginUserSlice
  },
})
