import React, { useState } from "react";
import storage from "../../../firebase-sec";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { collection, addDoc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { doc, updateDoc } from "firebase/firestore";

const InputIconUpload = (props:any) => {
  //loadingしているかしてないか監視する
//   const [loading, setLoading] = useState(false);
  // アップロードが完了したか確認する
//   const [isUploaded, setIsUploaded] = useState(false);
  // 画像のsrc
  const [imgSrc, setImgSrc] = useState("");

//   const OnFileUploadToFirebase = (e: any) => {
//     const file = e.target.files[0];

//     // パスと名前で参照を作成
//     const storageRef = ref(storage, "image/" + file.name);
//     // 画像のアップロード
//     const uploadImage = uploadBytesResumable(storageRef, file);
//     // 画像のダウンロード
//     getDownloadURL(storageRef)
//       .then((url) => {
//         setImgSrc(url);
//         console.log("画像のurlは" + url);
//       })
//       .catch((err) => console.log(err));

//     // 画像のモニタリング
//     uploadImage.on(
//       "state_changed",
//       // upload開始したらloading中になる(loadingがtrueになる)
//       (snapshot) => {
//         setLoading(true);
//       },
//       (err) => {
//         console.log(err);
//       },
//       //upload完了したらloadedになる(loadingがfalse,loadedがtrue)
//       () => {
//         setLoading(false);
//         setIsUploaded(true);
//       }
//     );
//     // fireStoreに画像を追加
//     // ドキュメント追加
//     const docRef = doc(db, "user", props.id);
//     setDoc(docRef, {
//       icon: `${ref(storage, "image/" + file.name)}`,
//     });

    // ドキュメント更新
    // const docImagePost = doc(db, "post", "zbzbfOdWidTHmKOjeyvr");
    // updateDoc(docImagePost, {
    // imgUrl: `${ref(storage,"image/"  + file.name)}`
    // });
//   };
const InputImage = (e:any) => {
const file = e.target.files[0];

// パスと名前で参照を作成
const storageRef = ref(storage,"image/"  + file.name);
// 画像のアップロード
uploadBytesResumable(storageRef, file);
// 画像のダウンロード
getDownloadURL(storageRef)
.then(url => {
setImgSrc(url)
console.log("画像のurlは" + url)
})
.catch(err => console.log(err))
}

const OnFirebase = async(e:any) => {
    // firestoreに追加
    const collectionUser:any =collection(db, "user");
    const docRef = await addDoc(collectionUser,
    {
    icon:imgSrc,
    });

    // ドキュメント更新
    const docImagePost = doc(db, "user", props.id);
    updateDoc(docImagePost, {
        id:docRef.id,
    });
    };
  return (
    <>
       {/* {loading ? (
         <h2>アップロード中</h2>
      ) : (
        <>
          {isUploaded ? (
            // 画面遷移（トップページとか？）
            <h2>アップロード完了</h2>
          ) : ( */}
            <div>
              <p>JpegかPngの画像ファイル</p>
              <input
                name="icon"
                type="file"
                accept=".png, .jpeg, .jpg"
                onChange={InputImage}
              />
            </div>
    {/* //       )}
    //     </>
    //   )} */}
     <button onClick={OnFirebase}>追加</button>
      <img alt="" src={imgSrc} />
    </>
  );
};

export default InputIconUpload;
