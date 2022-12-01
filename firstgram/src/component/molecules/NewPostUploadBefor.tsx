// import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
// import React, { useState } from 'react'
// import { AiOutlineAreaChart } from 'react-icons/ai'
// import { Link } from 'react-router-dom'
// import { storage } from '../../firebase';

// function NewPostUploadBefor() {
//         // // コメント
//         const [textState, setTextState] = useState("");
//         // コメントの更新
//         const InputText = (e:any)=>{
//             setTextState(e.target.value)
//         }

//             //loadingしているかしてないか監視する
//     const [loading, setloading] = useState(false);
//     // アップロードが完了したか確認する
//     const [isUploaded, setIsUploaded] = useState(false);

//        // 画像のsrc
//        const [imgSrc, setImgSrc] = useState("");

//         // 画像の更新
// const InputImage = (e:any) => {
//     // パスと名前で参照を作成
//     const file = e.target.files[0];
//     const storageRef = ref(storage,"image/"  + file.name);
//     // 画像のアップロード
//     const uploadImage = uploadBytesResumable(storageRef, file);
//     uploadImage.on("state_changed",
//     // upload開始したらloading中になる(loadingがtureになる)
//     (snapshot) => {
//         setloading(true);
//     },
//     (err) =>{
//         console.log(err);
//     },
//     //upload完了したらloadedになる(loadingがfalse,loadedがtrue)
//     () =>{
//         setloading(false);
//         setIsUploaded(true);

//         getDownloadURL(storageRef)
//         .then(url => {
//         setImgSrc(url)
//         })
// })
// }
        
//   return (
//         <div>
//     <div style={{width:"100%",height:"100px"}}>
//     <AiOutlineAreaChart size={40} style={{alignItems:"center",width:"100%"}}/>
//     </div>
//     <input name="imageURL" type="file" accept=".png, .jpeg, .jpg" onChange={ InputImage } 
//     style={{opacity: "",width:"100%"}}/>
    
//     <div style={{width:"100%",height:"60px"}}>
//     <textarea value={textState} placeholder="コメントを入力
//     してください" onChange={InputText} 
//     style={{width:"100%",height:"100px"}}/>
//     </div>

//     <div>
//     <Link to="/login/" ><button>戻る</button></Link>
//     <Link to="/NewPost/" ><button>投稿</button></Link>
//     </div>

//     </div>
//   )
// }

// export default NewPostUploadBefor
