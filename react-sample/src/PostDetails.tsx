 import { useEffect, useId, useState } from "react";
import { auth, db } from "./firebase";
import {collection,getDoc,doc,CollectionReference, deleteDoc, deleteField, updateDoc, arrayUnion,} from "firebase/firestore";
import { Link, useLocation } from "react-router-dom";
import firebasePostDetails from "./firebasePostDetails";
import { onAuthStateChanged, updateCurrentUser } from "firebase/auth";
import { current } from "@reduxjs/toolkit";

interface State {
      id:string,
      userid:string
}

function PostDetails() {
// ログインユーザー
const [loginUserPost,setLoginUserPost]=useState(false);
// ログインしているユーザーのuserNameを格納
const [loginUserName, setLoginUserName] = useState<any>("");

// 画像urlを格納
const [imgUrl, setImgUrl] = useState<any>("");
// captionを格納
const [caption, setCaption] = useState<any>("");
// favolitesを格納
const [favolites, setFavolites] = useState<any>([]);

// commentを格納
const [displayComment, setDisplayComment] = useState<any>([]);

// inputcommentを格納
const [inputComment, setInputComment] = useState<any>("テスト3");


// postlookからデータを持ってくる
const location = useLocation();
const {id,userid} = location.state as State

//ログイン判定
onAuthStateChanged(auth, async (user) => {
      if(user?.uid === userid){
      // useStateでログインしているユーザーの投稿かどうか判定するを保持
      setLoginUserPost(true)
      // ログインしているユーザーのuserNameをuseStateで保持
      const userDatas = doc(collection(db, "user"), user.uid);
      const  userDataGet = await getDoc(userDatas);
      const userData = userDataGet.data();
      const userName =userData?.userName
      setLoginUserName(userName)
      }else{
      setLoginUserPost(false)
      }
})

// 画面遷移したら、firestoreから画像、caption,falolites,commmentを取得、保持
useEffect(()=>{
firebasePostDetails(id).then((postData)=>{
setImgUrl(postData.Imgurl)
setCaption(postData.Caption)
setFavolites(postData.Favorites)
setDisplayComment(postData.Comment)
})
}, [])

// お気に入りボタンがクリックされたら
const Favorite = async(e:any)=>{
      // 押された投稿のFavolitesにloginUserNameを配列で追加
      const postDataDocRefId = doc(collection(db, "post"), id);
      updateDoc(postDataDocRefId, {
            favolites:arrayUnion(loginUserName),
      });
      // firestoreからfavolitesを取得、保持
      await firebasePostDetails(id).then((postData)=>{
      setFavolites(postData.Favorites)
      })
      };

// コメント送信ボタンがクリックされたら
const AddComment =async(e:any)=>{
      // 押された投稿のcommentにinputCommentを配列で追加
      const postDataDocRefId = doc(collection(db, "post"), id);
      updateDoc(postDataDocRefId, {
            comment:arrayUnion({username:loginUserName,commentText:inputComment}),
      });
      // firestoreからcommentを取得、保持
      await firebasePostDetails(id).then((postData)=>{
            setDisplayComment(postData.Comment)
            })
}

return (
<>
<div>
{loginUserPost ?(
<>
<Link to="/PostEditing" state={{id:id}}><button>編集</button></Link>
{/* <button onClick={ClickDelition}>削除</button><br /> */}
</>
):(
      <>
      </>
)}
</div>
<img src={imgUrl} />
<p>{caption}</p>
<div>
<input type="text" value={inputComment} onChange={(e)=>{setInputComment(e.target.value)}}></input>
</div>
<button onClick={AddComment}>コメント</button>
<button onClick={Favorite}>♡</button>
<p>♡ {favolites}</p>
<div>コメント:
{displayComment.map((data:any,index:any)=>{
    return(
    <div key={index}>
    <p>{data.username}</p>
    <p>{data.commentText}</p>
    </div>
    )
})}
</div>
</>
);
}


export default PostDetails;
