import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { useActionData, useRouteLoaderData } from 'react-router-dom';
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

const click = (e:any) => {
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
    console.log(userDatas)

    // ログインしているユーザーのデータを保持
    setLoginUserData(userDatas)
    console.log(userDatas)
    // ログインしているユーザーのフォローしている人のuseridを配列に格納
    // const followUserId = usersData.follow
    // const userloginuserdatafollw = userDatas?.follow
    setLoginUserFollowUserIdArray(userDatas?.follow)
    const UseLoginUserFollowUserIdArray =  userDatas?.follow

    console.log(UseLoginUserFollowUserIdArray)

    
    const loginUserFollowUserPostArray:any[] = []
    // const result = await Promise.all(UseLoginUserFollowUserIdArray.map(async(followUser:any)=>{
    //     const followUserInfo = doc(db, "user", followUser);
    //     const followUserPosts =await (await getDoc(followUserInfo)).data()?.post;
    //     // const newArray = [...array, ...followUserPosts]
    //     newArray.push(...followUserPosts)
    //     return newArray
    //     // followUserPosts
    //     }))
    // console.log(result)
    for(let followUser of UseLoginUserFollowUserIdArray){
    const followUserInfo = doc(db, "user", followUser);
    const followUserPosts =await (await getDoc(followUserInfo)).data()?.post;
    loginUserFollowUserPostArray.push(...followUserPosts)
    }
    console.log(loginUserFollowUserPostArray)
    setFollowUserPostArray(loginUserFollowUserPostArray)

    const postDataArray:any[] = []
    for(let postid of loginUserFollowUserPostArray){
    const postinformation = doc(db, "post", postid);
    const postDataDoc =  await getDoc(postinformation);
    const postDatas = postDataDoc.data();
    postDataArray.push(postDatas)
    }
    setPostData(postDataArray)
//     let array:any[] = []
//     // LoginUserFollowUserIdから、user情報を取得する
//     UseLoginUserFollowUserIdArray.map(async(followUserDocId:any) =>{
//     // folowUserDocIdのドキュメントへの参照を取得
//     const useriformation = doc(db, "user", followUserDocId);
//     // 上記を元にドキュメントのデータを取得
//     const userDataDoc =  await getDoc(useriformation);
//     // 取得したデータから必要なものを取り出す
//     const userData = userDataDoc.data();
//     // followUserのDataを保持
//     setFollowUserData(userData)
//     // followUserのDataからpostを取り出す
//     const followUserPost = userData?.post

//     console.log(followUserPost)
//     // followUserのpostをひとつずつ取り出して
//     followUserPost?.map((data:any)=>{
//     // followUserのpostをfolloeUserPostArrayの配列に格納
//     array.push(data)
//     // folloeUserPostArrayを保持
// })  
// })

// setFollowUserPostArray(array)  
// console.log(array[0])

    // const getPostData = followUserPostArray.map(async(postid:any)=>{
    // // posttestのドキュメントへの参照を取得
    // const postinformation = doc(db, "post", postid);
    // // 上記を元にドキュメントのデータを取得
    // const postDataDoc =  await getDoc(postinformation);
    // // 取得したデータから必要なものを取り出す
    // const postDatas = postDataDoc.data();

    // postData.push(postDatas)
    // setPostData(postData)
    // })
    }
    })
}

return (
<>
<button onClick={click}>ボタン</button>
<div>
{postData.map((data:any,index:any)=>{
    return(
    <div key={index}>
    <p>{data.postId}</p>
    <p>{data.text}</p>
    <img src={data.imgUrl} />
    {/* <a href="{data.postId}">ああ</a> */}
    </div>
    )
})}
</div>
</>
)
};

export default PostLook;
