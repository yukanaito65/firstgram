import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { connectStorageEmulator } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { Link, useActionData, useLocation, useRouteLoaderData } from 'react-router-dom';
import FavolitePostLook from './FavolitePostLook';
import { auth, db } from './firebase';

function PostLook() {
// followuserのpostidからとってきたpostData
const [postData, setPostData] = useState<any>([]);
// userName保持
const[userName,setUserName]=useState("");
// postid保持
const[postId,setPostId]=useState("");

// favolites保持
const[favolites,setFavolites]=useState("");

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
    
    // ログインしてるuserのuserName取得
    const username =  userDatas?.userName
    setUserName(username)

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

// postData.map((data:any)=>{
//     const id = data.postId
// setPostId(id)
// })
// console.log(postId)

const Favorite = (e:any)=>{
    FavolitePostLook().then((favo:any)=>{
        setFavolites(favo.favo)
        console.log(favolites)
    })
    }


return (
<>
<div>
{postData.map((data:any,index:any)=>{
    return(
    <div key={index}>
    <p>{data.caption}</p>
    <Link to="/PostDetails" state={{id:data.postId,userid:data.userId}}><img src={data.imgUrl} /></Link>
    <button onClick={Favorite}>♡</button>
    </div>
    )
})}
</div>
</>
)
};

export default PostLook;
