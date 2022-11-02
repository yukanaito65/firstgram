// import { getDownloadURL, getStorage, ref } from 'firebase/storage'
// import storage from "../../firebase";
// import React from 'react'

// function ImageDownload() {
//     const OnFileDownload = (e:any) => {
//     const storageImage = getStorage();
//     const file = e.target.files[0];
//     getDownloadURL(ref(storage, 'image/'  + file.name))
//     .then((url)=>{
//         // <img>に挿入
//         const img = document.getElementById('myimg');
//         img.setAttribute('src', url);
//       })
//       .catch((error) => {
//         console.log("err");
//       });
//     }
//   return (
//     <div>
//         <button 
//         type="button"
//         onClick={ OnFileDownload }
//         >画像表示</button>
//         <img id='myimg' src='' />
//     </div>
//   )
// }

// export default ImageDownload;
