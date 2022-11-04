// import { getDownloadURL, getStorage, ref } from 'firebase/storage'
// import storage from "../../firebase";
// import React, { useState } from 'react'
// import { fileURLToPath } from 'url';


// function ImageDownload() {
//     const [imgSrc, setImgSrc] = useState("");
//     // const Download = ()=>{
//     // const file = e.target.files[0];
//     const gsReference = ref(storage,
//     `gs://sns-app-c00fe.appspot.com/image/emiri.jpg`)
//     getDownloadURL(gsReference)
//     .then(url => {
//     setImgSrc(url)
//     console.log("画像のurlは" + url)
//     })
//     .catch(err => console.log(err))
//   return (
//     <div>
//     <img alt="" src={imgSrc} 
//     // onChange={Download}
//     />
//     </div>
//   )
//   }

// export default ImageDownload;
