import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";



export const fetchAsyncGet =createAsyncThunk("loginUser/get",()=>{

    onAuthStateChanged(auth, async (user) => {
        const userCollectionRef = collection(db, "user");
        const userDocRefId = doc(userCollectionRef, user?.uid);
        const userDocId = await getDoc(userDocRefId);
        const userDataId = userDocId.data();
        return userDataId
    })})

export const loginUserSlice:any = createSlice({
  name: "loginUser",
  initialState: {
  },

    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAsyncGet.fulfilled, (state, action) => {
          return {
            ...state,
            // fetchAsyncGetのreturn内容がpayloadに渡される
            users: action.payload,
          };
})}
})

// export const {  user } = loginUserSlice.actions;
export const selectUsers = (state:any) => state.loginUser.users;
export default loginUserSlice.reducer;
