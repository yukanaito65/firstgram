import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import firebasePostDetails from "../utils/firebasePostDetails";
import FirestoreUpdata from "../utils/FirestoreUpdata";
import Footer from "../molecules/Footer";
import Header from "../molecules/Header";

interface State {
    postid:string,
    userid:string
}

function PostEditing() {

// postlookからデータを持ってくる
const location = useLocation();
const {postid,userid} = location.state as State

// 画像urlを格納
const [imgUrl, setimgUrl] = useState<any>("");
// textを格納
const [text, setText] = useState<any>("");

useEffect(()=>{
firebasePostDetails(postid,userid).then((postData)=>{
setimgUrl(postData.Imgurl)
setText(postData.Caption)
})
}, [])

const Updata = ((e:any)=>{
console.log(text)
FirestoreUpdata(postid,text)
})

return (
<>
<Header show={true} />
<div>
<img src={imgUrl} />
<input type="text" value={text} onChange={(e)=>{setText(e.target.value)}}></input>
<Link to="/"><button onClick={Updata}>編集完了</button></Link>
<Link to="/"><button>戻る</button></Link>
</div>
<Footer />
</>
);
}


export default PostEditing;
