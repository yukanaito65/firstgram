import { onAuthStateChanged } from 'firebase/auth';
import { addDoc, arrayUnion, collection, doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { auth, db } from '../../firebase';
import BackBtn from '../atoms/button/BackBtn';
import Img from '../atoms/pictures/Img';

interface State {
    imgSrc:any
}

function NewPostUploadAuter(props:State) {
// コメント
 const [textState, setTextState] = useState("");

// firestoreに追加
const OnFirebase = async(e:any) => {
    // if(textState === ""){
//   ("テキストの入力がありません")
    // }else if(imgSrc === ""){
// ("画像の入力がありません")
    // }else {
    
    // const getRandomArbitrary =(min:number, max:number)=> {
    //     min = Math.ceil(min);
    //     max = Math.floor(max);
    //     return Math.floor(Math.random() * (max - min + 1) + min)
    // }
    
    const collectionPost:any =collection(db, "post");
    const docRef = await addDoc(collectionPost,
    {
    caption:textState,
    comments:[],
    favorites:[],
    keeps: [],
    imageUrl:props.imgSrc,
    postDate: serverTimestamp(),
    // number:getRandomArbitrary(1,5)
    });
    
    // ドキュメント更新(ID取得の為)
    const docImagePost = doc(db, "post", docRef.id);
    updateDoc(docImagePost, {
        postId:docRef.id,
    });
    
    // usersのログインしているuserのidを取得
    onAuthStateChanged(auth, async (user) => {
        if (!user) {
        <></>
        } else {
    
        //ログイン済みユーザーのドキュメントへの参照を取得
        const docusesinformation = doc(db, "user", user.uid);
// 上記を元にドキュメントのデータを取得
const postUserDoc = await getDoc(docusesinformation)
// 取得したデータから必要なものを取り出す
const postUserData = postUserDoc.data();
// 投稿者のpostを取り出す
const postUserIcon = postUserData?.icon

const postUserName =postUserData?.userName
 
        // ドキュメント更新(postId[]を作成、docRef.idを追加)
        updateDoc(docusesinformation, {
            posts: arrayUnion(docRef.id),
        });
        updateDoc(docImagePost, {
            userId:user.uid,
            icon:postUserIcon,
            userName:postUserName
        });
    }})
// };
    };

// コメントの更新
const InputText = (e:any)=>{
    setTextState(e.target.value)
}

  return (
    <div className='newpostuploadauter'>
    <Img imgUrl={props.imgSrc} 
    // style={{height:"300px",width:"100%"}}
    />
    {/* <InputNewPost /> */}
    <textarea rows={10} cols={40} name="inputPost" value={textState}
    placeholder="コメントを入力してください" onChange={InputText} 
    // style={{height:"300px",width:"100%",marginTop:"5px"}}
    className="newpostuploadauter__textarea"
    />

    <div   className="newpostuploadauter__btn"
    // style={{display:"flex",width:"100%",justifyContent: "space-between"}}
    >
    <BackBtn />
    <Link to="/postComplet" >
    <button onClick={OnFirebase}  className="newpostuploadauter__postbtn btn"
    // style={{textAlign:"right"}}
    >投稿</button></Link>
    </div>
    </div>
  )
}

export default NewPostUploadAuter
