import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, query, updateDoc, where ,serverTimestamp, arrayUnion} from 'firebase/firestore';
import { connectStorageEmulator } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { Link, useActionData, useLocation, useRouteLoaderData } from 'react-router-dom';
import AddKeepButton from './component/atoms/button/AddKeepButton';
import RemoveKeepButton from './component/atoms/button/RemoveKeepButton';
// import { setOriginalNode } from 'typescript';
// import FavolitePostLook from './FavolitePostLook';
import { auth, db } from './firebase';
import firebasePostDetails from './firebasePostDetails';
// import FollowUserPostFirebase from './FollowUserPostFirebase';


function PostLook() {
// followuserのpostidからとってきたpostData
const [postData, setPostData] = useState<any>([]);
// userName保持
const[userName,setUserName]=useState("");

// postid保持
const[postId,setPostId]=useState<any>("");

// favolites保持
const[favorites,setFavorites]=useState<any>([]);

// style有無判定
const [none,setNone]=useState<boolean>(false)

// commentを格納
const [displayComment, setDisplayComment] = useState<any>([]);

// inputcommentを格納
const [inputComment, setInputComment] = useState<any>("");

// ログインしているユーザーのuserNameを格納
const [loginUserName, setLoginUserName] = useState<any>("");

//保存ボタン用
const [loginUserKeep, setLoginUserKeep] = useState<any>("");

//
const [postDataSecond,  setPostDataSecond] = useState<any>({});



// const setFavorites2 = (postId:any)=>{
//     // setPostData(()=>{
//             for(let i = 0; i<postData.length; i++){
//                 console.log(postData[i])
//             if(postData[i].postId === postId){
//                 postData[i].favorites.push(userName)
//             }
//         }
// // })
// }

const postData2=[...postData]
    for(let i = 0; i<postData.length; i++){
        console.log(postId)
        if(postData[i].postId === postId){
            postData2[i].favorites.push()
        }
    }

const postData3=[...postData]
    for(let i = 0; i<postData.length; i++){
        if(postData[i].postId === postId){
            postData3[i].comments.push()
        }
    }



useEffect(()=>{
//ログイン判定
onAuthStateChanged(auth, async (user) => {
    // ログインしているユーザーのuserNameをuseStateで保持
    const userDatas = doc(collection(db, "user"), user?.uid);
    const  userDataGet = await getDoc(userDatas);
    const userData = userDataGet.data();
    const userName =userData?.userName
    setLoginUserName(userName)

    const keepPosts = userData?.keepPosts;
    setLoginUserKeep(keepPosts);

    if (!user) {
    console.log("ログアウト状態です");
    } else {
    //ログインしているユーザーのドキュメントへの参照を取得
    const docusesinformation = doc(db, "user", user.uid);
    //上記を元にドキュメントのデータを取得
    const userDataDoc =  await getDoc(docusesinformation);
    //取得したデータから必要なものを取り出す
    const userDatas = userDataDoc.data();
    // ログインしているユーザーのフォローしている人のuseridを配列に格納
    const UseLoginUserFollowUserIdArray =  userDatas?.follow

    // ログインしてるuserのuserName取得
    const username =  userDatas?.userName
    setUserName(username)

    const postDataArray:any[]=[];

    // followuserのpostドキュメントを配列に格納
    UseLoginUserFollowUserIdArray.forEach(async(followUserId:any)=>{
    const q = query(collection(db, "post"), where("userId", "==", followUserId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        const followUserPost =(doc.id, " => ", doc.data());
        // console.log(followUserPost)
        postDataArray.push(followUserPost)
    });
    })

    // ログインしているユーザーのpost情報を配列に格納
    const myPostId = userDatas?.post
    for(let postid of myPostId ){
            const information = doc(db, "post", postid);
            const DataDoc =  await getDoc(information);
            const Datas = DataDoc.data();
            // console.log(postDatas)
            postDataArray.push(Datas)
    }

    // データを保持
    setPostData(postDataArray)

}})

},
[]
// [postData]
)

const narabikae = [postData];
postData.sort((a: any, b: any) => {
return a.postDate.toDate() > b.postDate.toDate()  ? -1 : 1;
});
console.log(postData)
return (

<>
<div>
{postData.map((data:any,index:any)=>{
    const timestamp = data.postDate.toDate()
    const year = timestamp.getFullYear()
    const month = (timestamp.getMonth()+1)
    const day = timestamp.getDate()
    const hour = timestamp.getHours()
    const min = timestamp.getMinutes()
    const seco = timestamp.getSeconds()
    return(
    <>
    <div key={index}>
    <p>{data.caption}</p>
    <Link to="/PostDetails" state={{postid:data.postId,userid:data.userId}}><img src={data.imageUrl} /></Link>
    <div>{year}年{month}月{day}日{hour}:{min}:{seco}</div>
    <button onClick={
        async(e:any)=>{
        updateDoc(doc(collection(db, "post"), data.postId), {
        favorites:userName,
        });
        setPostData(()=>postData2)
}}>♡</button>
<input type="text" value={inputComment} onChange={(e)=>{setInputComment(e.target.value)}}></input>
<button onClick={async(e:any)=>{
        // 押された投稿のcommentにinputCommentを配列で追加
        updateDoc(doc(collection(db, "post"), data.postId), {
        comments:arrayUnion({userName:loginUserName,commentText:inputComment}),
        });

        setPostData(()=>postData3)
        setInputComment("")

}}>コメント</button>
{loginUserKeep.includes(data.postId) ? (
      <RemoveKeepButton postId={data.postId} />
) : (
      <AddKeepButton postId={data.postId} />
)}
<p>♡:{data.favorites}</p>
{/* <p>♡：{favorites}</p> */}
<div>コメント:
{/* {displayComment.map((data:any,index:any)=>{ */}
{data.comments.map((com:any,index:any)=>{
    return(
    <div key={index}>
    <p>{com.userName}</p>
    <p>{com.commentText}</p>
    </div>
    )
})}
</div>

    </div>
     </>
    )
})}
</div>

<Link to="/mypage"><button>マイページ</button></Link>
</>
)
};

export default PostLook;
