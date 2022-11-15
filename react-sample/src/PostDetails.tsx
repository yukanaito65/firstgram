 import { useEffect, useId, useState } from "react";
import { auth, db } from "./firebase";
import {collection,getDoc,doc,CollectionReference, deleteDoc, deleteField, updateDoc,} from "firebase/firestore";
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
// favolitesを格納
const [favolites, setfavolites] = useState<any>([]);
// userNameを格納
const [userName, setUserName] = useState<any>("");
// inputcommentを格納
const [inputComment, setInputComment] = useState<any>("");

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
      // postのドキュメントへの参照を取得
      const userDatas = doc(collection(db, "user"), user.uid);
      const  userDataGet = await getDoc(userDatas);
      const userData = userDataGet.data();
      const userName =userData?.userName
      setUserName(userName)
      // console.log(userName)
      }else{
            setLoginUserPost(false)
            // console.log(userid)
            // console.log(user?.uid)
      }
})

useEffect(()=>{
// .then(〜がきたときに)
firebasePostDetails(id).then((postData)=>{
setimgUrl(postData.imgUrl)
setText(postData.text)
setfavolites(postData.favorites)
})
}, [])

const Favorite = (e:any)=>{
      const postDataDocRefId = doc(collection(db, "post"), id);
      updateDoc(postDataDocRefId, {
            favorites:userName,
      });
      }

const AddComment =(e:any)=>{
      const postDataDocRefId = doc(collection(db, "post"), id);
      updateDoc(postDataDocRefId, {
            comment:{username:userName,comment:inputComment},
      });
}

const ClickDelition = async(e:any) =>{

// postのドキュメントへの参照を取得
const postDataDocRefId = doc(collection(db, "post"), id);
// 上記を元にドキュメントのデータを取得
const postDataDocId = await getDoc(postDataDocRefId);
// 取得したデータから必要なものを取り出す
const postDataId = postDataDocId.data();
// postuseridを取得(投稿者が誰か)
const postUserId = postDataId?.userId

// 投稿者のuser情報取得
const postUserDocRef = doc(collection(db,"user"),postUserId)
// 上記を元にドキュメントのデータを取得
const postUserDoc = await getDoc(postUserDocRef);
// 取得したデータから必要なものを取り出す
const postUserData = postUserDoc.data();
// 投稿者のpostを取り出す
const postUserPost = postUserData?.post

const postUserPostArray = []
postUserPostArray.push(...postUserPost)

var index = postUserPostArray.indexOf(id);
postUserPostArray.splice(index, 1)

await deleteDoc(doc(db, "post", id));
await updateDoc(postUserDocRef,{
      post: postUserPostArray
});

}

return (
<>
<div>

{loginUserPost ?(
       <>
      {/* <select>
      <option selected disabled>…</option>
      <option value="editing" onChange={(e)=>{setValue("editing")}}>編集</option>
      <option value="deletion" onChange={(e)=>{setValue("deletion")}}>削除</option>
      </select> */}

      <Link to="/PostEditing" state={{id:id}}><button>編集</button></Link>
      <button onClick={ClickDelition}>削除</button><br />
      <img src={imgUrl} />
      <p>{text}</p>
      
      <input value={inputComment} onChange={(e)=>{setInputComment(e.target.value)}} />
      <button onClick={AddComment}>コメント</button>
      <button onClick={Favorite}>♡</button>
      <p>♡ {favolites}</p>
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
