import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
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
    //取得したデータから必要なものを取り出す
    const userDatas = userDataDoc.data();
    // ログインしているユーザーのデータを保持
    setLoginUserData(userDatas)
    // ログインしているユーザーのフォローしている人のuseridを配列に格納
    setLoginUserFollowUserIdArray(userDatas?.follow)
    const UseLoginUserFollowUserIdArray =  userDatas?.follow

    
    const loginUserFollowUserPostArray:any[] = []
    // ログインしているユーザーのpostIdも上記配列に格納
    const myPostId = userDatas?.post
    loginUserFollowUserPostArray.push(...myPostId)

    // ログインしているuserのfollowのpostIDを配列に格納
    for(let followUser of UseLoginUserFollowUserIdArray){
    const followUserInfo = doc(db, "user", followUser);
    const followUserPosts =await (await getDoc(followUserInfo)).data()?.post;
    loginUserFollowUserPostArray.push(...followUserPosts)
    }
    
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

return (
<>
<div>
{postData.map((data:any,index:any)=>{
    return(
    <div key={index}>
    <p>{data.caption}</p>
    <Link to="/PostDetails" state={{id:data.postId,userid:data.userId}}><img src={data.imgUrl} /></Link>
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
