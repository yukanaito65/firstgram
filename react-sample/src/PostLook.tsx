import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { connectStorageEmulator } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { Link, useActionData, useRouteLoaderData } from 'react-router-dom';
import { auth, db } from './firebase';
import FollowUserPostFirebase from './FollowUserPostFirebase';

function PostLook() {
// followuserのpostidからとってきたpostData
const [postData, setPostData] = useState<any>([]);

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
    // ログインしているユーザーのフォローしている人のuseridを配列に格納
    const UseLoginUserFollowUserIdArray =  userDatas?.follow

    const postDataArray:any[]=[];

    // follouserのpostドキュメントを配列に格納
    UseLoginUserFollowUserIdArray.forEach(async(folloUserId:any)=>{
    const q = query(collection(db, "post"), where("userId", "==", folloUserId));
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
    <Link to="/PostDetails" state={{id:data.postId,userid:data.userId}}><img src={data.imgUrl} /></Link>
    </div>
    )
})}
</div>
</>
)
};

export default PostLook;
