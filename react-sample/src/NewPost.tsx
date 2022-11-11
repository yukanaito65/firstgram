import React, { useState } from "react";
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import storage from "./firebase-sec";
import {Link} from "react-router-dom";

const NewPost = (props:any) => {
    //loadingしているかしてないか監視する
    const [loading, setloading] = useState(false);
    // アップロードが完了したか確認する
    const [isUploaded, setIsUploaded] = useState(false);
    // 画像のsrc
    const [imgSrc, setImgSrc] = useState("");
    // コメント
    const [textState, setTextState] = useState("");

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
const collectionPost:any =collection(db, "post");
const docRef = await addDoc(collectionPost,
{
imageUrl:imgSrc,
caption:textState,
postDate: serverTimestamp(),
favorites: [],
 userId: props.uid,
});

// ドキュメント更新(ID取得の為)
const docImagePost = doc(db, "post", docRef.id);
updateDoc(docImagePost, {
    postId:docRef.id,
});
};

};

return (
    <>
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
        <Link to="/NewPost/" ><button onClick={OnFirebase}>投稿</button></Link>
        <Link to="/login/" ><button>戻る</button></Link>
        </div>
    ):(
    <div>
    <input name="imageURL" type="file" accept=".png, .jpeg, .jpg"
    onChange={ InputImage }/>
    <textarea rows={10} cols={40} name="inputPost" value={textState}
    placeholder="コメントを入力してください" onChange={InputText} />
    <Link to="/NewPost/" ><button onClick={OnFirebase}>投稿</button></Link>
    <Link to="/login/" ><button>戻る</button></Link>
    </div>
    )}
        </>
    )}
</>
);
};

export default NewPost;
