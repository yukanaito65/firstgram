import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, query, updateDoc, where ,serverTimestamp, arrayUnion} from 'firebase/firestore';
import { connectStorageEmulator } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { Link, useActionData, useLocation, useRouteLoaderData } from 'react-router-dom';
import { setOriginalNode } from 'typescript';
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


useEffect(()=>{
//ログイン判定
onAuthStateChanged(auth, async (user) => {
    // ログインしているユーザーのuserNameをuseStateで保持
    const userDatas = doc(collection(db, "user"), user?.uid);
    const  userDataGet = await getDoc(userDatas);
    const userData = userDataGet.data();
    const userName =userData?.userName
    setLoginUserName(userName)
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

}})
}, [])

const narabikae = [postData];
postData.sort((a: any, b: any) => {
return a.postDate.toDate() > b.postDate.toDate()  ? -1 : 1;
});

return (
<>
{/* {for(let i=0; i < 1;  i++){ */}
<div>
{postData.map((data:any,index:any)=>{
    const timestamp = data.postDate.toDate()
    const year = timestamp.getFullYear()
    const month = (timestamp.getMonth()+1)
    const day = timestamp.getDate()
    const hour = timestamp.getHours()
    const min = timestamp.getMinutes()
    const seco = timestamp.getSeconds()
    // const id = data.postId
    // setPostId(id)
    return(
    <>
    <div key={index}>
    <p>{data.caption}</p>
    <Link to="/PostDetails" state={{id:data.postId,userid:data.userId}}><img src={data.imageUrl} /></Link>
    <div>{year}年{month}月{day}日{hour}:{min}:{seco}</div>
    <button onClick={
        // useEffect(
        async(e:any)=>{
    updateDoc(doc(collection(db, "post"), data.postId), {
        favorites:userName,
        });
    // await (await getDoc(doc(collection(db, "post"), data.postId))).data()?.favolites
    setFavorites(await (await getDoc(doc(collection(db, "post"), data.postId))).data()?.favorites)
    // this.forceUpdate()
    // window.location.reload()
// }, [])
}}>♡</button>
{/* <p style={none:stylnone}> */}
<input type="text" value={inputComment} onChange={(e)=>{setInputComment(e.target.value)}}></input>
<button onClick={async(e:any)=>{
        // 押された投稿のcommentにinputCommentを配列で追加
        updateDoc(doc(collection(db, "post"), data.postId), {
        comments:arrayUnion({userName:loginUserName,commentText:inputComment}),
        });
        // firestoreからcommentを取得、保持
        // await(await getDoc(doc(collection(db, "post"), data.postId))).data()?.comment
        setDisplayComment (await(await getDoc(doc(collection(db, "post"), data.postId))).data()?.comments)
        setInputComment("")
}}>コメント</button>
<p>♡:{data.favorites}</p>
{/* <p>♡：{favorites}</p> */}
<div>コメント:
{/* {displayComment.map((data:any,index:any)=>{ */}
{data.comments.map((com:any,index:any)=>{
    return(
    <div key={index}>
    <p>{com.userName}</p>
    <p>{com.commentText}</p>
    {/* <button onClick={async(e:any)=>{
        await (await getDoc(doc(collection(db,"post"),data.postId))).data()?.comment.splice(
        await (await getDoc(doc(collection(db,"post"),data.postId))).data()?.comment.com.username, 1)

        await updateDoc(doc(collection(db,"post"),data.postId),{
            post: await (await getDoc(doc(collection(db,"post"),data.postId))).data()?.comment
      });

        await (await getDoc(doc(collection(db,"post"),data.postId))).data()?.comment.splice(
        await (await getDoc(doc(collection(db,"post"),data.postId))).data()?.comment.com.commentText, 1)

        await updateDoc(doc(collection(db,"post"),data.postId),{
            post: await (await getDoc(doc(collection(db,"post"),data.postId))).data()?.comment
          });
        }}>削除</button> */}
    </div>
    )
})}
</div>

    </div>
     </>
    )
})}

</div>
{/* }} */}



<Link to="/mypage"><button>マイページ</button></Link>
</>
)
};

export default PostLook;
