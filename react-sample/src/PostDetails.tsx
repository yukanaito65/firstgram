 import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import {collection,getDoc,doc,CollectionReference,} from "firebase/firestore";
import { Link, useLocation } from "react-router-dom";
import firebasePostDetails from "./firebasePostDetails";
import { onAuthStateChanged } from "firebase/auth";

interface State {
      id:string
}

function PostDetails() {
const [value , setValue] = useState("");
// 画像urlを格納
const [imgUrl, setimgUrl] = useState<any>("");
// textを格納
const [text, setText] = useState<any>("");
// ログインユーザー

//ログイン判定
onAuthStateChanged(auth, async (user) => {
      if (!user) {
      console.log(user);
      } else {
      console.log(user)
      }
})

// postlookからデータを持ってくる
const location = useLocation();
const {id} = location.state as State



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

<select>
      <option selected disabled>…</option>
      <option value="editing" onChange={(e)=>{setValue("editing")}}>編集</option>
      <option value="deletion" onChange={(e)=>{setValue("deletion")}}>削除</option>
</select>

<img src={imgUrl} />
{}
<p>{text}</p>
<input type="text" value={text} onChange={(e)=>{setText(e.target.value)}}></input>
</div>
</>
);
}


export default PostDetails;
