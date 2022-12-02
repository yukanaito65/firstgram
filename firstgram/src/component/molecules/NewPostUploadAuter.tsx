import { onAuthStateChanged } from 'firebase/auth';
import { addDoc, arrayUnion, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { auth, db } from '../../firebase';
import BackBtn from '../atoms/button/BackBtn';

interface State {
    imgSrc:any
}

function NewPostUploadAuter(props:State) {
// コメント
 const [textState, setTextState] = useState("");

    // firestoreに追加
const OnFirebase = async(e:any) => {
    // if(textState === ""){
    // console.log("テキストの入力がありません")
    // }else if(imgSrc === ""){
    // console.log("画像の入力がありません")
    // }else {
    
    const getRandomArbitrary =(min:number, max:number)=> {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    
    const collectionPost:any =collection(db, "post");
    const docRef = await addDoc(collectionPost,
    {
    caption:textState,
    comments:[],
    favorites:[],
    keeps: [],
    imageUrl:props.imgSrc,
    postDate: serverTimestamp(),
    number:getRandomArbitrary(1,5)
    });
    
    // ドキュメント更新(ID取得の為)
    const docImagePost = doc(db, "post", docRef.id);
    updateDoc(docImagePost, {
        postId:docRef.id,
    });
    
    // usersのログインしているuserのidを取得
    onAuthStateChanged(auth, async (user) => {
        if (!user) {
        console.log("ログアウト状態です");
        } else {
        console.log("ログイン状態です");
        //ログイン済みユーザーのドキュメントへの参照を取得
        const docusesinformation = doc(db, "user", user.uid);
        // ドキュメント更新(postId[]を作成、docRef.idを追加)
        updateDoc(docusesinformation, {
            posts: arrayUnion(docRef.id),
        });
        updateDoc(docImagePost, {
            userId:user.uid,
        });
    }})
// };
    };

// コメントの更新
const InputText = (e:any)=>{
    setTextState(e.target.value)
}

  return (
    <div>
    <img alt="" src={props.imgSrc} />
    {/* <InputNewPost /> */}
    <textarea rows={10} cols={40} name="inputPost" value={textState}
    placeholder="コメントを入力してください" onChange={InputText} />
    <Link to="/" ><button onClick={OnFirebase}>投稿</button></Link>
    <BackBtn />
    </div>
  )
}

export default NewPostUploadAuter
