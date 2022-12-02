import { useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";
import { AiOutlineAreaChart } from "react-icons/ai";
import Footer from "../molecules/Footer";
import Header from "../molecules/Header";
import "../../css/newPost.css"
import NewPostUploadAuter from "../molecules/NewPostUploadAuter";
// import InputNewPost from "../atoms/Input/InputNewPost";
import BackBtn from "../atoms/button/BackBtn";

const NewPost = (props:any) => {
//loadingしているかしてないか監視する
const [loading, setloading] = useState(false);
// アップロードが完了したか確認する
const [isUploaded, setIsUploaded] = useState(false);
// 画像のsrc
const [imgSrc, setImgSrc] = useState("");

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
return (
<>
<Header show={true} />

    {loading ? (
        <div>
            <p>loading</p>
        </div>
    ) : (
        <>
        {isUploaded ? (
            <>
            <NewPostUploadAuter imgSrc={imgSrc} />
            {/* <InputNewPost /> */}
            </>
        ):(
            <>
            <div style={{border:"solid 1px #333 ",height:"300px"}}>
            <AiOutlineAreaChart size={40} style={{alignItems:"center",width:"100%"}}/>
            <input name="imageURL" type="file" accept=".png, .jpeg, .jpg" onChange={ InputImage } 
            // style={{opacity:}}
            />
            </div>
            <BackBtn />
            </>
        )}
        </>
    )}

<Footer />
</>

);};

export default NewPost;
