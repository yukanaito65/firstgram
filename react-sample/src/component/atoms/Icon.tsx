// import React, { useEffect, useState } from "react";
// // import noIcon from "../../../public/noIcon.png";
// import { db } from "../../firebase";
// import { doc, collection, getDocs, onSnapshot } from "firebase/firestore";
// import { async } from "@firebase/util";



// function Icon() {
//   const [posts, setPosts] = useState([]);

//   useEffect(()=>{
//     //データベースからデータを取得する
//     const postData = collection(db, "posts");

//     // console.log(`iconフォルダ${postData}`);

//     //getDocsでドキュメントのデータを全て取得できる
//     getDocs(postData).then((snapShot:any)=> {
//       setPosts(snapShot.docs.map((doc:any)=>({...doc.data() })));
//     });

//     // リアルタイムで取得(これをしないとリロードしないとデータベースに新規追加された情報が表示されない)
//     onSnapshot(postData,(post:any)=> {
//       setPosts(post.docs.map((doc:any)=> ({...doc.data()})))
//     })

//   },[]);

//   // const userRef = collection(db, "users");
//   // const docRef = doc(db, "users", "1oqek7UGl4126Nq4MGU1");
//   // const docSnap = await getDoc(docRef);

// // const handleClick = async() => {
// // const querySnapshot = await getDocs(collection(db, "user"));
// // querySnapshot.forEach((doc) => {
// //   // console.log(`${doc.id} => ${doc.data()}`);
// //   console.log(doc.data);
// // });

// // const db = firebase.firestore()
// // const doc = await db.collection('user').doc('1oqek7UGl4126Nq4MGU1').get();
// // console.log(doc.data());

// // db.collection('user').get().then((snapshot:any)=>{
// //   snapshot.forEach(doc=>{
// //     console.log(doc.id, '=>', doc.data());
// //   });
// // })
// // }

// // const docId = "1oqek7UGl4126Nq4MGU1";
// // const docRef = firestore.collection("user").doc(docId);
// // const doc = await docRef.get

// // const handleClick = () => {
// //   db.collection('user').get.then
// // }

//   return (
//     <>
//       <div
//         style={{
//           borderRadius: "50%",
//           width: "100px",
//           height: "100px",
//           backgroundColor: "#d3d3d3",
//         }}
//       >
//         <img
//           src={`${process.env.PUBLIC_URL}/noIcon.png`}
//           alt="NoImage"
//           style={{ width: "100%", height: "100%" }}
//         />
//       </div>
//       {/* <button onClick={handleClick}>取得</button> */}
//       <div>
//         <div>
//           {posts}
//           {posts.map((post:any)=>(
//             <div key={post.userId}>
//               <p>{post.name}</p>
//               <p>{post.email}</p>
//             </div>
//           ))}
//         </div>
//       </div>
// </>
//   );
// }

// export default Icon;

// //false ログインしていない状態はnoIcon(会員登録ページでしか使用しない)
// //true ログインしていればimageUrlの画像表示(画像登録なければnoIcon)
