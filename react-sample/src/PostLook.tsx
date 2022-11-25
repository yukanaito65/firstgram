import { onAuthStateChanged } from 'firebase/auth';


import { collection, doc, getDoc, getDocs, query, updateDoc, where ,serverTimestamp, arrayUnion} from 'firebase/firestore';
import { connectStorageEmulator } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { Link, useActionData, useLocation, useRouteLoaderData } from 'react-router-dom';
import AddKeepButton from './component/atoms/button/AddKeepButton';
import RemoveKeepButton from './component/atoms/button/RemoveKeepButton';

import AddFavBtn from './AddFavBtn';
import { auth, db } from './firebase';
import NoFavBtn from './NoFavBtn';
import Footer from "./component/molecules/Footer";
import Header from "./component/molecules/Header";
import GetLoginUserName from './GetLoginUserData';



function PostLook() {
// followuserのpostidからとってきたpostData
const [postData, setPostData] = useState<any>([]);
// followuserのpostidからとってきたpostData
const [ramData, setRamData] = useState<any>([]);
// postid保持
const[postId,setPostId]=useState<any>("");
// inputcommentを格納
const [inputComment, setInputComment] = useState<any>("");
// ログインしているユーザーのuserNameを格納
const [loginUserName, setLoginUserName] = useState<any>("");


// ログインしているユーザーのfollowしている人のIdの配列
const [followUser, setFollowUser] = useState<any>([]);

// ログインしているユーザーのpostの配列
const [myPostId, setMyPostID] = useState<any>([]);

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
onAuthStateChanged(auth, async (user) => {
// ログインしているユーザーのuserNameをuseStateで保持
GetLoginUserName(user).then((loginUserData:any)=>{
        setLoginUserName(loginUserData.userName);
})

    if (!user) {
    console.log("ログアウト状態です");
    } else {


    // ログインしているユーザーのデータ取得
    // GetLoginUserName(user).then((loginUserData:any)=>{
    //     setFollowUser(loginUserData.follow);
    //     setMyPostID(loginUserData.post)
    // })

        //ログインしているユーザーのドキュメントへの参照を取得
        const docusesinformation = doc(db, "user", user.uid);
        //上記を元にドキュメントのデータを取得
        const userDataDoc =  await getDoc(docusesinformation);
        //取得したデータから必要なものを取り出す
        const userDatas = userDataDoc.data();
        // ログインしているユーザーのフォローしている人のuseridを配列に格納
        const UseLoginUserFollowUserIdArray =  userDatas?.follow


        setFollowUser(UseLoginUserFollowUserIdArray)

    const postDataArray:any[]=[];

    // followuserのpostドキュメントを配列に格納
    UseLoginUserFollowUserIdArray.forEach(async(followUserId:any)=>{
    const q = query(collection(db, "post"), where("userId", "==", followUserId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const followUserPost =(doc.id, " => ", doc.data());
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

// ランダムの数値のpostを取得
    const getRandomArbitrary =(min:number, max:number)=> {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    const randomArray:any[]=[];
    const q = query(collection(db, "post"), where("number", "==", getRandomArbitrary(1,5)));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const followUserPost =(doc.id, " => ", doc.data());
        randomArray.push(followUserPost)
    });
    setRamData(randomArray)



}})
},
[]
// [postData]
)




// 日付順に並び替え
postData.sort((a: any, b: any) => {
return a.postDate.toDate() > b.postDate.toDate()  ? -1 : 1;
});

return (
<>
{/* <Header /> */}
<div>
{followUser.length === 0 ? (
    <>
    {console.log("followUserない")}
    <div>
    {ramData.map((data:any,index:any)=>{
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
    
    {data.favorites.includes(loginUserName)?(
    <NoFavBtn postId={data.postId} userName={loginUserName} />
    ):(
    <AddFavBtn postId={data.postId} userName={loginUserName} />
    )}
    
    <input type="text" value={inputComment} onChange={(e)=>{setInputComment(e.target.value)}} />
    <button onClick={async(e:any)=>{
    // 押された投稿のcommentにinputCommentを配列で追加
    updateDoc(doc(collection(db, "post"), data.postId), {
    comments:arrayUnion({userName:loginUserName,commentText:inputComment}),
    });
    setPostData(()=>postData3)
    setInputComment("")
    }}>コメント</button>
    <p>♡:{data.favorites}</p>
    <div>コメント:
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

):(

    <>
    { console.log("followUserある")}
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
    
        {data.favorites.includes(loginUserName)?(
        <NoFavBtn postId={data.postId} userName={loginUserName} />
    ):(
        <AddFavBtn postId={data.postId} userName={loginUserName} />
    )
    }
    
    <input type="text" value={inputComment} onChange={(e)=>{setInputComment(e.target.value)}} />
    <button onClick={async(e:any)=>{
    // 押された投稿のcommentにinputCommentを配列で追加
    updateDoc(doc(collection(db, "post"), data.postId), {
    comments:arrayUnion({userName:loginUserName,commentText:inputComment}),
    });
    setPostData(()=>postData3)
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
)}
</div>
<Footer />
</>
)
};

export default PostLook;
