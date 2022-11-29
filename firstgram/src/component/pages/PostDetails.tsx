 import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import {collection,getDoc,doc, deleteDoc, updateDoc, arrayUnion, arrayRemove,} from "firebase/firestore";
import { Link, useLocation } from "react-router-dom";
import firebasePostDetails from "../utils/firebasePostDetails";
import { onAuthStateChanged } from "firebase/auth";
import LoginUserName from "../utils/GetLoginUserData";
import Footer from "../molecules/Footer";
import Header from "../molecules/Header";
import GetLoginUserData from "../utils/GetLoginUserData";
import FavoriteUpdata from "../utils/FavoriteUpdata";
import { AiFillHeart,AiOutlineHeart } from "react-icons/ai";
import CommonIcon from "../atoms/pictures/CommonIcon";
import Remove from "../atoms/button/RemoveKeepButton";
import AddKeepButton from "../atoms/button/AddKeepButton";
import RemoveKeepButton from "../atoms/button/RemoveKeepButton";

interface State {
      postid:string,
      userid:string
}

function PostDetails() {

      const [user, setUser] = useState<any>("");
// ログインユーザー
const [loginUserPost,setLoginUserPost]=useState(false);
// ログインしているユーザーのuserNameを格納
const [loginUserName, setLoginUserName] = useState<any>("");
// ログインしているユーザーのkeepPostsを格納(保存ボタン用)
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



// postlookからデータを持ってくる
const location = useLocation();
const {postid,userid} = location.state as State

useEffect(()=>{
//ログイン判定
onAuthStateChanged(auth, async (user) => {

      setUser(user);

GetLoginUserData(user).then((loginUserData:any)=>{
setLoginUserName(loginUserData.userName);
setLoginUserKeep(loginUserData.keepPosts);
})

if(user?.uid === userid){
// useStateでログインしているユーザーの投稿かどうか判定するを保持
setLoginUserPost(true)
}else{
setLoginUserPost(false)
}
})


// 画面遷移したら、firestoreから画像、caption,falolites,commmentを取得、保持
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
}, [])

// お気に入りボタンがクリックされたら
const Favorite = async(e:any)=>{
      // 押された投稿のFavolitesにloginUserNameを配列で追加
      FavoriteUpdata(postid,loginUserName,arrayUnion)
      // firestoreからfavolitesを取得、保持
      await firebasePostDetails(postid,userid).then((postData)=>{
      setFavorites(postData.Favorites)
      })
};

// お気に入り取り消し機能
const NoFavorite = async(e:any)=>{
      // 押された投稿のFavolitesからloginUserNameを削除
      FavoriteUpdata(postid,loginUserName,arrayRemove)
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
// 投稿者のuser情報取得
const postUserDocRef = doc(collection(db,"user"),userid)
// 上記を元にドキュメントのデータを取得
const postUserDoc = await getDoc(postUserDocRef);
// 取得したデータから必要なものを取り出す
const postUserData = postUserDoc.data();
// 投稿者のpostを取り出す
const postUserPost = postUserData?.posts

const index = postUserPost.indexOf(postid);
postUserPost.splice(index, 1)
console.log(postUserPost)
await updateDoc(postUserDocRef,{
      posts: postUserPost
});
await deleteDoc(doc(db, "post", postid));
}
return (
<>
<Header show={true} />
{/* <img src={icon} /> */}
<Link to={userid === user.uid ? "/mypage" : "/profile"} state={{ userId: userid}}><CommonIcon icon={icon}/></Link>
<p>{postUserName}</p>
<img src={imgUrl} />
<p>{caption}</p>
<div>
<input type="text" value={inputComment} onChange={(e)=>{setInputComment(e.target.value)}}></input>
</div>
<button onClick={AddComment}>コメント</button>
{/* 保存ボタン追加!ログインユーザーのkeepPosts配列(loginUserKeep)に今表示しているpostのpostId(postId)が存在したら保存解除ボタン、存在しなかったら保存するボタン */}
{loginUserKeep.includes(postid) ? (
      <RemoveKeepButton postId={postid} />
) : (
      <AddKeepButton postId={postid} />
)}


{favorites.includes(loginUserName)?(
<button onClick={NoFavorite}>
<AiOutlineHeart size={20} color={"rgb(38, 38, 38)"} />
</button>
):(
<button onClick={Favorite}>
<AiFillHeart size={20} color={"red"} />
</button>
)}
<div><AiFillHeart size={14} color={"red"} />: {favorites}</div>
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
<Link to="/"><button>戻る</button></Link>
<div>
{loginUserPost ?(
<>
<Link to="/PostEditing" state={{postid:postid,userid:userid}}><button>編集</button></Link>
<Link to="/"><button onClick={ClickDelition}>削除</button></Link>
</>
):(
<>
</>
)}
</div>
<Footer />
</>
);
};


export default PostDetails;
