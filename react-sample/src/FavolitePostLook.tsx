import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { auth, db } from './firebase';


const  FavolitePostLook=async(userName:string)=> {
// const[favolite,setFavolite]=useState([])

interface State {
        id:string
    }

const location = useLocation();
const {id} = location.state as State

const postDataDocRef = doc(collection(db, "post"), id);
// updateDoc(postDataDocRef, {
//       favolites:userName,
//   });

// console.log(id)
// const postdataDoc =await (await getDoc(postDataDocRef)).data()?.favolites
// setFavolite(postdataDoc)

  return (
    {favo:postDataDocRef}
  )
}

export default FavolitePostLook



// import { onAuthStateChanged } from 'firebase/auth';
// import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
// import { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { auth, db } from './firebase';

// interface Props {
//     id:any,
// }

// const  FavolitePostLook=(props:Props)=> {
// const[favolite,setFavolite]=useState([])
// const[userName, setUserName] = useState("");

// interface State {
//         id:string
//     }

// const location = useLocation();
// const {id} = location.state as State

// //ログイン判定
// onAuthStateChanged(auth, async (user) => {
//     if (!user) {
//     console.log("ログアウト状態です");
//     } else {
//     //ログインしているユーザーのドキュメントへの参照を取得
//     const docusesinformation = doc(db, "user", user.uid);
//     //上記を元にドキュメントのデータを取得
//     const userDataDoc =  await getDoc(docusesinformation);
//     //取得したデータから必要なものを取り出す
//     const userDatas = userDataDoc.data();
//     // ログインしているユーザーのフォローしている人のuseridを配列に格納
//     const UseLoginUserFollowUserIdArray =  userDatas?.follow

//     // ログインしてるuserのuserName取得
//     const username =  userDatas?.userName
//     setUserName(username)
//     }})

// const Favorite =async(e:any)=>{
// const postDataDocRef = doc(collection(db, "post"), id);
// updateDoc(postDataDocRef, {
//       favolites:userName,
//   });

// // console.log(id)
// const postdataDoc =await (await getDoc(postDataDocRef)).data()?.favolites
// setFavolite(postdataDoc)
// }

// return (
// <>
// <button onClick={Favorite}>♡</button>
// </>
//   )
// }

// export default FavolitePostLook;
