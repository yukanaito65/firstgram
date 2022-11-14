 import { useEffect, useId, useState } from "react";
import { auth, db } from "./firebase";
import {collection,getDoc,doc,CollectionReference,} from "firebase/firestore";
import { Link, useLocation } from "react-router-dom";
import firebasePostDetails from "./firebasePostDetails";
import { onAuthStateChanged, updateCurrentUser } from "firebase/auth";
import { current } from "@reduxjs/toolkit";

interface State {
      id:string,
      userid:string
}

function PostDetails() {
const [value , setValue] = useState("");
// 画像urlを格納
const [imgUrl, setimgUrl] = useState<any>("");
// textを格納
const [text, setText] = useState<any>("");
// ログインユーザー
const [loginUserPost,setLoginUserPost]=useState(false)


// postlookからデータを持ってくる
const location = useLocation();
const {id,userid} = location.state as State
// const {userId} =location.state as State

//ログイン判定
onAuthStateChanged(auth, async (user) => {
      if(user?.uid === userid){
            setLoginUserPost(true)
      }else{
            setLoginUserPost(false)
            console.log(userid)
            console.log(user?.uid)
      }
      // if (!user) {
      // console.log(user);
      // } else {
      // console.log(user.uid)
      // }
})



useEffect(()=>{
// .then(〜がきたときに)
firebasePostDetails(id).then((postData)=>{
setimgUrl(postData.imgUrl)
setText(postData.text)
})
}, [])

return (
<>
<div>

{loginUserPost ?(
       <>
      <select>
      <option selected disabled>…</option>
      <option value="editing" onChange={(e)=>{setValue("editing")}}>編集</option>
      <option value="deletion" onChange={(e)=>{setValue("deletion")}}>削除</option>
      </select>
     
      <img src={imgUrl} />
      <p>{text}</p>
      <Link to="/PostEditing" state={{id:id}}><button>編集</button></Link>
      </>
):(
      <>
      <img src={imgUrl} />
      <p>{text}</p>
      {/* <Link to="/PostEditing" state={{id:id}}><button>編集</button></Link> */}
      </>
)}


</div>
</>
);
}


export default PostDetails;
