import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, query, updateDoc, where ,serverTimestamp} from 'firebase/firestore';
import { connectStorageEmulator } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { Link, useActionData, useLocation, useRouteLoaderData } from 'react-router-dom';
import FavolitePostLook from './FavolitePostLook';
// import FavolitePostLook from './FavolitePostLook';
import { auth, db } from './firebase';
// import FollowUserPostFirebase from './FollowUserPostFirebase';


function PostLook() {
// followuserのpostidからとってきたpostData
const [postData, setPostData] = useState<any>([]);
// userName保持
const[userName,setUserName]=useState("");

// postid保持
const[postId,setPostId]=useState<any>("");

// favolites保持
const[favolites,setFavolites]=useState<any>([]);


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


const Favorite = async(e:any)=>{
//     // const postDataDocRefId = doc(collection(db, "post"), postId);
//     // updateDoc(postDataDocRefId, {
//     //       favorites:userName,
// const postdataDoc =await (await getDoc(postDataDocRef)).data()?.favolites
// setFavolite(postdataDoc)
//     //   });

//     // firebasePostDetails(userName)

    FavolitePostLook(userName).then((favo:any)=>{
        // setFavolites(favo.favo)
        console.log(favolites)
    })
    }

const narabikae = [postData];
postData.sort((a: any, b: any) => {
return a.postData.toDate() > b.postData.toDate()  ? -1 : 1;
});

return (
<>
<div>
    
{postData.map((data:any,index:any)=>{
    const timestamp = data.postData.toDate()
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
    <Link to="/PostDetails" state={{id:data.postId,userid:data.userId}}><img src={data.imgUrl} /></Link>
    <div>{year}年{month}月{day}日{hour}:{min}:{seco}</div>
    <button onClick={Favorite}>♡</button>
    <button>コメント</button>
    {/* <FavolitePostLook Props={data.postId} />   */}
    </div>
     </>
    )
})}
</div>
</>
)
};

export default PostLook;
