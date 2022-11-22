 import { useEffect, useId, useState } from "react";
import { auth, db } from "./firebase";
import {collection,getDoc,doc,CollectionReference, deleteDoc, deleteField, updateDoc, arrayUnion, query, where, getDocs,} from "firebase/firestore";
import { Link, useLocation } from "react-router-dom";
import firebasePostDetails from "./firebasePostDetails";
import { onAuthStateChanged, updateCurrentUser } from "firebase/auth";
import { current } from "@reduxjs/toolkit";
import CommonIcon from "./component/atoms/pictures/CommonIcon";
import RemoveKeepButton from "./component/atoms/button/RemoveKeepButton";
import AddKeepButton from "./component/atoms/button/AddKeepButton";

interface State {
      postid:string,
      userid:string

}

function PostDetails() {
// ログインユーザー
const [loginUserPost,setLoginUserPost]=useState(false);
// ログインしているユーザーのuserNameを格納
const [loginUserName, setLoginUserName] = useState<any>("");
// ログインしているユーザーのkeepPostsを格納
const [loginUserKeep, setLoginUserKeep] = useState("");

// 画像urlを格納
const [imgUrl, setImgUrl] = useState<any>("");
// captionを格納
const [caption, setCaption] = useState<any>("");
// timeを格納
const [Time, setTime] = useState<any>("");
// favolitesを格納
const [favorites, setFavorites] = useState<any>([]);

// commentを格納
const [displayComment, setDisplayComment] = useState<any>([]);

// inputcommentを格納
const [inputComment, setInputComment] = useState<any>("");

// postUserNameを格納
const [postUserName, setPostUserName] = useState<any>("");
// iconを格納
const [icon, setIcon] = useState<any>("");

// timeを格納
const [time, settime] = useState<any>("");
// yearを格納
const [year, setYear] = useState<any>("");
// monthを格納
const [month, setMonth] = useState<any>("");
// dayを格納
const [day, setDay] = useState<any>("");
// dayを格納
const [hour, setHour] = useState<any>("");
// dayを格納
const [min, setMin] = useState<any>("");
// dayを格納
const [seco, setSeco] = useState<any>("");

const [displayPostId, setDisplayPostId] = useState<any>("");

const [keepList, setKeepList] = useState<any>([]);


// postlookからデータを持ってくる
const location = useLocation();
const {postid,userid} = location.state as State

//ログイン判定
onAuthStateChanged(auth, async (user) => {
      // ログインしているユーザーのuserNameをuseStateで保持
      const userDatas = doc(collection(db, "user"), user?.uid);
      const  userDataGet = await getDoc(userDatas);
      const userData = userDataGet.data();
      const userName =userData?.userName
      setLoginUserName(userName);

      const keepPosts = userData?.keepPosts;
      setLoginUserKeep(keepPosts);

      if(user?.uid === userId){
      // useStateでログインしているユーザーの投稿かどうか判定するを保持
      setLoginUserPost(true)
      }else{
      setLoginUserPost(false)
      }
})


// 画面遷移したら、firestoreから画像、caption,falolites,commmentを取得、保持
useEffect(()=>{

firebasePostDetails(postid,userid).then((postData)=>{

      // setKeepList(loginUserKeep);
      // setDisplayPostId(postId)

setImgUrl(postData.Imgurl)
setCaption(postData.Caption)
setFavorites(postData.Favorites)
setDisplayComment(postData.Comments)
setTime(postData.Time)
setPostUserName(postData.PostUserName)
setIcon(postData.Icon)
})

// settime(Time.toDate())
// setYear(time.getFullYear())
// setMonth((time.getMonth()+1))
// setDay(time.getDate())
// setHour(time.getHours())
// setMin(time.getMinutes())
// setSeco(time.getSeconds())

}, [])

// お気に入りボタンがクリックされたら
const Favorite = async(e:any)=>{
      // 押された投稿のFavolitesにloginUserNameを配列で追加

      const postDataDocRefId = doc(collection(db, "post"), postid);


      console.log(loginUserName)
      updateDoc(postDataDocRefId, {
            favorites:arrayUnion(loginUserName),
      });
      // firestoreからfavolitesを取得、保持

      await firebasePostDetails(postid,userid).then((postData)=>{

      setFavorites(postData.Favorites)
      })
      };

// コメント送信ボタンがクリックされたら
const AddComment =async(e:any)=>{
      // 押された投稿のcommentにinputCommentを配列で追加

      const postDataDocRefId = doc(collection(db, "post"), postid);

      updateDoc(postDataDocRefId, {
            comments:arrayUnion({userName:loginUserName,commentText:inputComment}),
      });
      // firestoreからcommentを取得、保持

      await firebasePostDetails(postid,userid).then((postData)=>{

            setDisplayComment(postData.Comments)
            })
      setInputComment("")
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


const index = postUserPost.indexOf(postid);

postUserPost.splice(index, 1)

console.log(postUserPost)

await updateDoc(postUserDocRef,{
      post: postUserPost
});

await deleteDoc(doc(db, "post", postid));

}


return (
<>
<img src={icon} />
{/* <CommonIcon icon={icon}/> */}
<p>{postUserName}</p>
<img src={imgUrl} />
<p>{caption}</p>
{/* <p>{year}年{month}月{day}日{hour}:{min}:{seco}</p> */}
<div>
<input type="text" value={inputComment} onChange={(e)=>{setInputComment(e.target.value)}}></input>
</div>
<button onClick={AddComment}>コメント</button>
{/* 保存ボタン追加!ログインユーザーのkeepPosts配列(loginUserKeep)に今表示しているpostのpostId(postId)が存在したら保存解除ボタン、存在しなかったら保存するボタン */}
{/* {keepList.includes(displayPostId) ? (
      <RemoveKeepButton postId={displayPostId} />
) : (
      <AddKeepButton postId={displayPostId} />
)} */}

<button onClick={Favorite}>♡</button>
<div>♡: {favorites}</div>
<div>コメント:
{displayComment.map((data:any,index:any)=>{
    return(
    <div key={index}>
    <p>{data.userName}</p>
    <p>{data.commentText}</p>
    </div>
    )
})}
</div>
<Link to="/PostLook"><button>戻る</button></Link>
<div>
{loginUserPost ?(
<>

<Link to="/PostEditing" state={{id:postid,userid:userid}}><button>編集</button></Link>

<Link to="/PostLook"><button onClick={ClickDelition}>削除</button></Link>
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
