import { createSlice } from "@reduxjs/toolkit";

export const followerCount: any = createSlice({
  name: "followerList",
  // initialState: { follower: [] },
  initialState:"",
  reducers: {
    followerData: (initialState, action) => {
      initialState = action.payload;
    },
  },
});

export default followerCount.reducer;
export const {followerData}=followerCount.actions;
