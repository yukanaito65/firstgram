import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { connectStorageEmulator } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { Link, useActionData, useRouteLoaderData } from 'react-router-dom';
import { auth, db } from './firebase';

function PostLook() {
// ログインしているuserのデータを保持
const [loginUserData, setLoginUserData] = useState<any>({});
// ログインしているuserのフォローしているuserIDを保持
const [loginUserFollowUserIdArray, setLoginUserFollowUserIdArray] = useState<any>([]);
// followUserのDataを保持
const [followUserData, setFollowUserData] = useState<any>([]);
//  followuserのpostidを保持
const [followUserPostArray, setFollowUserPostArray] = useState<any>([]);
// followuserのpostidからとってきたpostData
const [postData, setPostData] = useState<any>([]);

// userIdを保持
const [userId, setUserId] = useState("");
// PostIdを保持
const [postId, setPostId] = useState("");

// const click = (e:any) => {
useEffect(()=>{
//ログイン判定
onAuthStateChanged(auth, async (user) => {
    if (!user) {
    console.log("ログアウト状態です");
    } else {
    //ログインしているユーザーのドキュメントへの参照を取得
    const docusesinformation = doc(db, "user", user.uid);
    //上記を元にドキュメントのデータを取得
    const userDataDoc =  await getDoc(docusesinformation);
    // console.log(userDataDoc)
    //取得したデータから必要なものを取り出す
    const userDatas = userDataDoc.data();
    // console.log(userDatas)
    // ログインしているユーザーのデータを保持
    setLoginUserData(userDatas)
    // ログインしているユーザーのフォローしている人のuseridを配列に格納
    setLoginUserFollowUserIdArray(userDatas?.follow)
    const UseLoginUserFollowUserIdArray =  userDatas?.follow
    // console.log(UseLoginUserFollowUserIdArray) 
    const loginUserId =userDatas?.userId
    setUserId(loginUserId)
    // followuserのid取得できてる

    
    const loginUserFollowUserPostArray:any[] = [];
    // ログインしているuserのfollowのpostIDを配列に格納
//     (async () => {
//     for await(let followUser of UseLoginUserFollowUserIdArray){
//     // console.log(followUser)
//     const followUserInfo = doc(db, "user", followUser);
//     // console.log(followUserInfo)
//     const followUserPosts =await getDoc(followUserInfo);
//     // console.log(followUserPosts)
//     const followUserPostsData = followUserPosts.data();
//     console.log(followUserPostsData)
//     const followUserPostsDataPost = followUserPostsData?.post;
//     loginUserFollowUserPostArray.push(...followUserPostsDataPost)
//     // const followUserPosts =await (await getDoc(followUserInfo)).data()?.post;
//     // loginUserFollowUserPostArray.push(...followUserPosts)
//     }
// })
// ();

// ここから
// UseLoginUserFollowUserIdArray.forEach(async(followUser:any)=>{
//     const followUserInfo = doc(db, "user", followUser);
//     // console.log(followUserInfo)
//     const followUserPosts =await getDoc(followUserInfo);
//     // console.log(followUserPosts)
//     // console.log(followUserPosts)
//     const followUserPostsData = followUserPosts.data();
//     console.log(followUserPostsData)
//     const followUserPostsDataPost = followUserPostsData?.post;
//     loginUserFollowUserPostArray.push(...followUserPostsDataPost)
// })
// ここまで

// UseLoginUserFollowUserIdArray.map(async(followUser:any) => {
//     const followUserInfo = doc(db, "user", followUser);
//     // console.log(followUserInfo)
//     const followUserPosts =await getDoc(followUserInfo);
//     // console.log(followUserPosts)
//     // console.log(followUserPosts)
//     const followUserPostsData = followUserPosts.data();
//     console.log(followUserPostsData)
//     const followUserPostsDataPost = followUserPostsData?.post;
//     loginUserFollowUserPostArray.push(...followUserPostsDataPost)

// })

// for(let followUser of UseLoginUserFollowUserIdArray){
//     const followUserInfo = doc(db, "user", followUser);
//     const followUserPosts =await (await getDoc(followUserInfo)).data()?.post;
//     loginUserFollowUserPostArray.push(...followUserPosts)
//     }

    // ログインしているユーザーのpostIdも上記配列に格納
    const myPostId = userDatas?.post
    loginUserFollowUserPostArray.push(...myPostId)
    
    setFollowUserPostArray(loginUserFollowUserPostArray)

    // 上記postidの配列からpost情報を取得
    const postDataArray:any[] = []
    for(let postid of loginUserFollowUserPostArray){
    const postinformation = doc(db, "post", postid);
    const postDataDoc =  await getDoc(postinformation);
    const postDatas = postDataDoc.data();
    postDataArray.push(postDatas)
    }
    setPostData(postDataArray)
    }
    })

}, [])

// console.log(postId)
// const Favorite = async(e:any)=>{
//     const postDataDocRefId = doc(collection(db, "post"), postId);
//     updateDoc(postDataDocRefId, {
//           favorites:userId,
//       });
//     }

return (
<>
<div>
{postData.map((data:any,index:any)=>{
    return(
    <div key={index}>
    <p>{data.caption}</p>
    {/* <div onChange={(e:any)=>{setPostId(e.target.value)}}>{data.postId}</div> */}
    <Link to="/PostDetails" state={{id:data.postId,userid:data.userId}}><img src={data.imgUrl} /></Link>
    {/* <button onClick={Favorite}>♡</button> */}
    {/* <Link to="/PostEditing" state={{id:data.postId}}><img src={data.imgUrl} /></Link> */}
    {/* 日付が表示できない */}
    {/* <p>{data.timestamp}</p> */}
    {/* <a href="{data.postId}">ああ</a> */}
    </div>
    )
})}
</div>
</>
)
};

export default PostLook;
