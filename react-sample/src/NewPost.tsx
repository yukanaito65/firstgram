import React, { useState } from "react";
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { addDoc, arrayUnion, collection, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { storage } from "./firebase";
import {Link} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { AiOutlineAreaChart } from "react-icons/ai";
import Footer from "./component/molecules/Footer";
import Header from "./component/molecules/Header";
import "./css/newPost.css";


const NewPost = (props:any) => {
    //loadingしているかしてないか監視する
    const [loading, setloading] = useState(false);
    // アップロードが完了したか確認する
    const [isUploaded, setIsUploaded] = useState(false);
    // 画像のsrc
    const [imgSrc, setImgSrc] = useState("");
    // コメント
    const [textState, setTextState] = useState("");
      //ログイン状態保持(userが値を持てばログイン状態)
    const [user, setUser] = useState<any>("");

// コメントの更新
const InputText = (e:any)=>{
    setTextState(e.target.value)
}

// 画像の更新
const InputImage = (e:any) => {
    // パスと名前で参照を作成
    const file = e.target.files[0];
    const storageRef = ref(storage,"image/"  + file.name);
    // 画像のアップロード
    const uploadImage = uploadBytesResumable(storageRef, file);
    uploadImage.on("state_changed",
    // upload開始したらloading中になる(loadingがtureになる)
    (snapshot) => {
        setloading(true);
    },
    (err) =>{
        console.log(err);
    },
    //upload完了したらloadedになる(loadingがfalse,loadedがtrue)
    () =>{
        setloading(false);
        setIsUploaded(true);

        getDownloadURL(storageRef)
        .then(url => {
        setImgSrc(url)
        })
})
}

// firestoreに追加
const OnFirebase = async(e:any) => {
if(textState === ""){
console.log("テキストの入力がありません")
}else if(imgSrc === ""){
console.log("画像の入力がありません")
}else {

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
imageUrl:imgSrc,
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
        post: arrayUnion(docRef.id),
    });
    updateDoc(docImagePost, {
        userId:user.uid,
    });

    // //上記を元にドキュメントのデータを取得
    // const userDoc = await getDoc(docRef);

    }
})

};
};


return (
    <>
    {/* <Header /> */}
    {loading ? (
        <div>
            <button>
            <p>uploading</p>
            <input name="imageURL" type="file" accept=".png, .jpeg, .jpg"
            onChange={ InputImage }/>
            </button>
            <textarea rows={10} cols={40} name="inputPost" value={textState}
            placeholder="コメントを入力してください" onChange={InputText} />
            <Link to="/NewPost/" ><button onClick={OnFirebase}>投稿</button></Link>
            <Link to="/login/" ><button>戻る</button></Link>
        </div>
    ) : (
        <>
    {isUploaded ? (
        <div>
        <img alt="" src={imgSrc} />
        <textarea rows={10} cols={40} name="inputPost" value={textState}
        placeholder="コメントを入力してください" onChange={InputText} />
        <Link to="/" ><button onClick={OnFirebase}>投稿</button></Link>
        <Link to="/login/" ><button>戻る</button></Link>
        </div>
    ):(

    <div>


    <div className ="FileBtn ">
    <AiOutlineAreaChart size={40}/>
    <input name="imageURL" type="file" accept=".png, .jpeg, .jpg" onChange={ InputImage } />
    </div>
    
    <div className ="Textarea" >
    <textarea value={textState} placeholder="コメントを入力
    してください" onChange={InputText} />
    </div>

    <Link to="/NewPost/" ><button onClick={OnFirebase}>投稿</button></Link>


    <Link to="/login/" ><button>戻る</button></Link>
    </div>
    )}
        </>
    )}
    <Footer />
</>

);
};

export default NewPost;
