import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import { auth, db } from "../firebase";


interface State {
  userId: string;
}

// const location = useLocation();
//   const { userId } = location.state as State;

// export const getData=createAsyncThunk(userId,()=>{
//   onAuthStateChanged(auth, async (currentUser: any) => {
//     const userCollectionRef = collection(db, "user");
//     // setUserCollectionRef(userCollectionRef);

//     //ログインユーザーのfollow配列取得(フォローボタン用)
//     const userDocRefId = doc(userCollectionRef, currentUser.uid);

//     const userDocId = await getDoc(userDocRefId);

//     const userDataFollow = userDocId.get("follow");
//     // setUsersFollow(userDataFollow);

//     //前のページから渡されたuserIdを元にデータ取得し、usersに格納
//     const profileUserDocRefId = doc(userCollectionRef, userId);

//     const profileUserDocId = await getDoc(profileUserDocRefId);

//     const profileUserDataId = profileUserDocId.data();
//     // setProfileUsers(profileUserDataId);

//     return profileUserDataId;

// })
// })

export const followerCount: any = createSlice({
  name: "followerList",
  // initialState: { follower: [] },
  initialState:{follower:[]},
  reducers: {
    // followerData: (initialState, action) => {
    //   initialState = action.payload;
    },
    // extraReducers: (builder) => {
    //   builder.addCase(getData.fulfilled, (state, action) => {
    //     return {
    //       ...state,
    //       // fetchAsyncGetのreturn内容がpayloadに渡される
    //       users: action.payload,
    //     };
    //   });
    // },

});

export default followerCount.reducer;
export const {followerData}=followerCount.actions;


//export cont selectTasks = (state)=>
//↑使う時はuseSelector
//fetchはextraReducerを使う？
