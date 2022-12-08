// import { onAuthStateChanged } from 'firebase/auth';
// import { addDoc, arrayUnion, collection, CollectionReference, doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
// import React, { useState } from 'react'
// import { Link, useLocation } from 'react-router-dom';
// import { auth, db } from '../../../firebase';

// interface State {
//     imgSrc:string
// }

// function InputNewPost() {

// // コメント
// const [textState, setTextState] = useState("");

//   // postlookからデータを持ってくる
//   const location = useLocation();
//   const { imgSrc } = location.state as State;


// // firestoreに追加
// const OnFirebase = async(e:any) => {
//     // if(textState === ""){
//     // console.log("テキストの入力がありません")
//     // }else if(imgSrc === ""){
//     // console.log("画像の入力がありません")
//     // }else {
    
//     const getRandomArbitrary =(min:number, max:number)=> {
//         min = Math.ceil(min);
//         max = Math.floor(max);
//         return Math.floor(Math.random() * (max - min + 1) + min)
//     }
    
//     const collectionPost :CollectionReference=collection(db, "post");
//     const docRef = await addDoc(collectionPost,
//     {
//     caption:textState,
//     comments:[],
//     favorites:[],
//     keeps: [],
//     imageUrl:imgSrc,
//     postDate: serverTimestamp(),
//     number:getRandomArbitrary(1,5)
//     });
    
//     // ドキュメント更新(ID取得の為)
//     const docImagePost = doc(db, "post", docRef.id);
//     updateDoc(docImagePost, {
//         postId:docRef.id,
//     });
    
//     // usersのログインしているuserのidを取得
//     onAuthStateChanged(auth, async (user) => {
//         if (!user) {
//         console.log("ログアウト状態です");
//         } else {
//         console.log("ログイン状態です");
//         //ログイン済みユーザーのドキュメントへの参照を取得
//         const docusesinformation = doc(db, "user", user.uid);
// // 上記を元にドキュメントのデータを取得
// const postUserDoc = await getDoc(docusesinformation)
// // 取得したデータから必要なものを取り出す
// const postUserData = postUserDoc.data();
// // 投稿者のpostを取り出す
// const postUserIcon = postUserData?.icon

// const postUserName =postUserData?.userName
 
//         // ドキュメント更新(postId[]を作成、docRef.idを追加)
//         updateDoc(docusesinformation, {
//             posts: arrayUnion(docRef.id),
//         });
//         updateDoc(docImagePost, {
//             userId:user.uid,
//             icon:postUserIcon,
//             userName:postUserName
//         });
//     }})
// // };
//     };

// // コメントの更新
// const InputText = (e:any)=>{
//     setTextState(e.target.value)
// }

// return (
//     <div>
//     <textarea value={textState} placeholder="コメントを入力
//     してください" onChange={InputText} 
//     style={{width:"100%",height:"100px"}}
//     />
//     <Link to="/" ><button onClick={OnFirebase}>投稿</button></Link>
//     </div>
// )
// }

// export default InputNewPost
