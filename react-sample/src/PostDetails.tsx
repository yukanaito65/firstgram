 import { useEffect, useId, useState } from "react";
import { auth, db } from "./firebase";
import {collection,getDoc,doc,CollectionReference, deleteDoc, deleteField, updateDoc, arrayUnion, query, where, getDocs,} from "firebase/firestore";
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
// timeを格納
const [Time, setTime] = useState<any>("");
// favolitesを格納
const [favolites, setFavolites] = useState<any>([]);

// commentを格納
const [displayComment, setDisplayComment] = useState<any>([]);

// inputcommentを格納
const [inputComment, setInputComment] = useState<any>("");

// postUserNameを格納
const [postUserName, setPostUserName] = useState<any>("");
// iconを格納
const [icon, setIcon] = useState<any>("");


// postlookからデータを持ってくる
const location = useLocation();
const {id,userid} = location.state as State

//ログイン判定
onAuthStateChanged(auth, async (user) => {
      // ログインしているユーザーのuserNameをuseStateで保持
      const userDatas = doc(collection(db, "user"), user?.uid);
      const  userDataGet = await getDoc(userDatas);
      const userData = userDataGet.data();
      const userName =userData?.userName
      setLoginUserName(userName)
      if(user?.uid === userid){
      // useStateでログインしているユーザーの投稿かどうか判定するを保持
      setLoginUserPost(true)
      }else{
      setLoginUserPost(false)
      }
})


// 画面遷移したら、firestoreから画像、caption,falolites,commmentを取得、保持
useEffect(()=>{
firebasePostDetails(id,userid).then((postData)=>{
setImgUrl(postData.Imgurl)
setCaption(postData.Caption)
setFavolites(postData.Favorites)
setDisplayComment(postData.Comment)
setTime(postData.Time)
// setPostUserName(postData.PostUserName)
// setIcon(postData.Icon)
})

}, [])

// お気に入りボタンがクリックされたら
const Favorite = async(e:any)=>{
      // 押された投稿のFavolitesにloginUserNameを配列で追加
      const postDataDocRefId = doc(collection(db, "post"), id);
      console.log(loginUserName)
      updateDoc(postDataDocRefId, {
            favolites:arrayUnion(loginUserName),
      });
      // firestoreからfavolitesを取得、保持
      await firebasePostDetails(id,userid).then((postData)=>{
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
      await firebasePostDetails(id,userid).then((postData)=>{
            setDisplayComment(postData.Comment)
            })
}


const ClickDelition = async(e:any) =>{
// postのドキュメントへの参照を取得
// const postDataDocRefId = doc(collection(db, "post"), id);
// // 上記を元にドキュメントのデータを取得
// const postDataDocId = await getDoc(postDataDocRefId);
// // 取得したデータから必要なものを取り出す
// const postDataId = postDataDocId.data();
// // postuseridを取得(投稿者が誰か)
// const postUserId = postDataId?.userId

// 投稿者のuser情報取得
const postUserDocRef = doc(collection(db,"user"),userid)
// 上記を元にドキュメントのデータを取得
const postUserDoc = await getDoc(postUserDocRef);
// 取得したデータから必要なものを取り出す
const postUserData = postUserDoc.data();
// 投稿者のpostを取り出す
const postUserPost = postUserData?.post

const index = postUserPost.indexOf(id);
postUserPost.splice(index, 1)

console.log(postUserPost)

await updateDoc(postUserDocRef,{
      post: postUserPost
});

await deleteDoc(doc(db, "post", id));
}


// const time = Time.toDate()
// const year = time.getFullYear()
// const month = (time.getMonth()+1)
// const day = time.getDate()
// const hour = time.getHours()
// const min = time.getMinutes()
// const seco = time.getSeconds()

// console.log(Time.toDate())

return (
<>
{/* <img src={icon} /><p>{postUserName}</p> */}
<img src={imgUrl} />
<p>{caption}</p>
{/* <p>{year}年{month}月{day}日{hour}:{min}:{seco}</p> */}
<div>
<input type="text" value={inputComment} onChange={(e)=>{setInputComment(e.target.value)}}></input>
</div>
<button onClick={AddComment}>コメント</button>
<button onClick={Favorite}>♡</button>
<div>♡: {favolites}</div>
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
<Link to="/PostLook"><button>戻る</button></Link>
<div>
{loginUserPost ?(
<>
<Link to="/PostEditing" state={{id:id}}><button>編集</button></Link>
<button onClick={ClickDelition}>削除</button><br />
</>
):(
      <>
      </>
)}
</div>
</>
);
};


export default PostDetails;
