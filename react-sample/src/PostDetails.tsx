 import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import {collection,getDoc,doc,CollectionReference,} from "firebase/firestore";

function PostDetails() {
      //取得してきたデータを保持
const [postData, setPostData] = useState<any>([]);

const Click = async () =>{
      //コレクションへの参照を取得
      const postDataCollectionRef = collection(db, "postTest") ;

      // //上記を元にドキュメントへの参照を取得
      const postDataDocRefId = doc(postDataCollectionRef, "5JmiLlaOyfc1W9x3LAzk");
    
      // //上記を元にドキュメントのデータを取得
      const postDataDocId = await getDoc(postDataDocRefId);

      // //取得したデータから必要なものを取り出す
      const postDataId = postDataDocId.data();
      console.log(postDataId);
      setPostData(postDataId);
}

return (
<>
    <div className="icon-image" style={{borderRadius: "50%",width: "100px",height: "100px",border: "2px, lightgray",}}>
    <button onClick={Click}>テスト</button>
    <img  src={postData.imgUrl} alt="icon" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
    <input value={postData.test}></input>
    {/* <p>{postData.timestamp}</p> */}
    </div>
    {/* )} */}
</>
);
}


export default PostDetails;
