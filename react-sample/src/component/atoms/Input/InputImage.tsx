import React, { useState } from "react";
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import storage from "../../../firebase-sec";

const NewPost = () => {
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
    uploadBytesResumable(storageRef, file);
    // 画像のダウンロード
    getDownloadURL(storageRef)
    .then(url => {
    setImgSrc(url)
    })
    .catch(err => console.log(err))
    }

// firestoreに追加
const OnFirebase = async(e:any) => {
const collectionPost:any =collection(db, "postTest");
const docRef = await addDoc(collectionPost,
{test:"test",
imgUrl:imgSrc,
text:textState
});

// ドキュメント更新(ID取得の為)
const docImagePost = doc(db, "postTest", docRef.id);
updateDoc(docImagePost, {
    id:docRef.id,
});
};

return (
<>
        <div>
        <input name="imageURL" type="file" accept=".png, .jpeg, .jpg"
        onChange={ InputImage }/>
        <textarea rows={10} cols={40} name="inputPost" value={textState} 
        placeholder="コメントを入力してください" onChange={InputText} />
        <button onClick={OnFirebase}>投稿</button>
        <img alt="" src={imgSrc} />
        {textState}
        </div>
    
</>
);
};

export default NewPost;
