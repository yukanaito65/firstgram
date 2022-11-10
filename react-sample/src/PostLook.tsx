import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { useActionData, useRouteLoaderData } from 'react-router-dom';
import { auth, db } from './firebase';

function PostLook() {
// 取得してきたデータを保持
const [postData, setPostData] = useState<any>([]);
// usersDataを保持
const [usersData, setUsersData] = useState<any>({});
// usersDataを保持
const [postIdArray, setPostIdArray] = useState<any>([]);


const click = (e:any) => {
//ログイン判定
onAuthStateChanged(auth, async (user) => {
    if (!user) {
    console.log("ログアウト状態です");
    } else {
    //ログイン済みユーザーのドキュメントへの参照を取得
    const docusesinformation = doc(db, "user", user.uid);

     //上記を元にドキュメントのデータを取得
     const userDataDoc =  await getDoc(docusesinformation);

    // //取得したデータから必要なものを取り出す
     const userDatas = userDataDoc.data();
     setUsersData(userDatas)

    // postIDを取り出す
    const postIds = usersData.postId

    setPostIdArray(postIds)

    // mapでpostIdの配列のIdを回して、下記作業をする
    // ここで、userのフォロワーとかの情報も同じ配列にpushする
    const getPostData = postIdArray.map(async(postid:any) =>{
    // posttestのドキュメントへの参照を取得
    const postinformation = doc(db, "postTest", postid);
    // 上記を元にドキュメントのデータを取得
    const postDataDoc =  await getDoc(postinformation);
    // 取得したデータから必要なものを取り出す
    const postDatas = postDataDoc.data();

    postData.push(postDatas)
    setPostData(postData)
    })
    console.log(postData)

    }
})
}

  return (
<>

<button onClick={click}>botann</button>

<div>
{postData.map((data:any)=>{
    return(
    <>
    <p>{data.text}</p>
    <img src={data.imgUrl} />
    </>
    )
})}
</div>

</>
  )
};

export default PostLook;
