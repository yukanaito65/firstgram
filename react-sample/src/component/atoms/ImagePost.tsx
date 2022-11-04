import React, { useState } from "react";
import storage from "../../firebase-sec";
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";

// import ImageLogo from "../../../public/image.svg"
// import { FirebaseError } from "firebase/app";
// import { collection, addDoc, setDoc } from "firebase/firestore"; 
// import { db } from '../../firebase';
// import { doc, updateDoc } from "firebase/firestore";

const ImageUploader = () => {
    //loadingしているかしてないか監視する
    const [loading, setloading] = useState(false);
    // アップロードが完了したか確認する
    const [isUploaded, setIsUploaded] = useState(false);
    // 画像のsrc
    const [imgSrc, setImgSrc] = useState("");

const OnFileUploadToFirebase = (e:any) => {
    const file = e.target.files[0];
    
    // パスと名前で参照を作成
    const storageRef = ref(storage,"image/"  + file.name);
    // 画像のアップロード
    const uploadImage = uploadBytesResumable(storageRef, file);
    // 画像のダウンロード
    getDownloadURL(storageRef)
    .then(url => {
    setImgSrc(url)
    console.log("画像のurlは" + url)
    })
    .catch(err => console.log(err))

    // 画像のモニタリング
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
        }
    )
    
// firestoreに画像を追加
// ドキュメント追加
// const docRef = addDoc(collection(db, "post"), 
// {caption: "test",
//   imgUrl: `${ref(storage,"image/"  + file.name)}`
// });
// ドキュメント更新
// const docImagePost = doc(db, "post", "zbzbfOdWidTHmKOjeyvr");
// updateDoc(docImagePost, {
// imgUrl: `${ref(storage,"image/"  + file.name)}`
// });
};
return (
<>
    {loading ? (
        <h2>アップロード中</h2>
    ) : (
        <>
    {isUploaded ? (
        // 画面遷移（トップページとか？）
        <h2>アップロード完了</h2>
    ):(
        <div>
        <p>JpegかPngの画像ファイル</p>
        <input name="imageURL" type="file" accept=".png, .jpeg, .jpg"
        onChange={ OnFileUploadToFirebase }/>
        </div>
    )}
        </>
    )}
    <img alt="" src={imgSrc} />
</>
);
};

export default ImageUploader;
