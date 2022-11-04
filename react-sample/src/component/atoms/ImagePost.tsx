import React, { useState } from "react";
// import ImageLogo from "../../../public/image.svg"
import storage from "../../firebase";
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";

const ImageUploader = () => {

    //loadingしているかしてないか監視する
    const [loading, setloading] = useState(false);
    // アップロードが完了したか確認する
    const [isUploaded, setIsUploaded] = useState(false);
    // 画像のsrc
    const [imgSrc, setImgSrc] = useState("");

  const OnFileUploadToFirebase = (e:any) => {
    // console.log(e.target.files[0].name);
    const file = e.target.files[0];
    // パスと名前で参照を作成
    const storageRef = ref(storage,"image/"  + file.name);
    // uploadBytes(storageRef, file).then((snapshot) => {
    //   console.log("Uploaded a blob or file!");
    // });

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
    uploadImage.on(
        "state_changed",
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
    
    

};
  return (
    <>
    {loading ? (
    <h2>アップロード中</h2>
     ) : (
        <>
        {isUploaded ? (
        <h2>アップロード完了</h2>
        ):(
      <div>
        <p>JpegかPngの画像ファイル</p>
          {/* <img src={ImageLogo} alt="imagelogo" /> */}
        <input 
        // multiple
        name="imageURL"
        type="file"
        accept=".png, .jpeg, .jpg"
        onChange={ OnFileUploadToFirebase }
        />
    </div>
        )}
    </>
    )}
    <img alt="" src={imgSrc} 
    // onChange={Download}
    />
    </>
    
  );
};

export default ImageUploader;
