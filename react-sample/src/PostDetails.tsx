 import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import {collection,getDoc,doc,CollectionReference,} from "firebase/firestore";
import { useLocation } from "react-router-dom";
import firebasePostDetails from "./firebasePostDetails";

interface State {
      id:string
}

function PostDetails() {
// postlookからデータを持ってくる
const location = useLocation();
const {id} = location.state as State
//取得してきたデータを保持
const [postData, setPostData] = useState<any>([]);
// 画像urlを格納
const [imgUrl, setimgUrl] = useState<any>("");
// textを格納
const [text, setText] = useState<any>("");

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
<img src={imgUrl} />
<p>{text}</p>
<input type="text" value={text} onChange={(e)=>{setText(e.target.value)}}></input>
</div>
</>
);
}


export default PostDetails;
