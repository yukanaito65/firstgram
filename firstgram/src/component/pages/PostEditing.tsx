import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import firebasePostDetails from "../utils/firebasePostDetails";
import FirestoreUpdata from "../utils/FirestoreUpdata";
import Footer from "../organisms/Footer";
import Header from "../organisms/Header";
import BackBtn from "../atoms/button/BackBtn";

interface State {
    postid:string,
    userid:string
}

function PostEditing() {

// postlookからデータを持ってくる
const location = useLocation();
const {postid,userid} = location.state as State

// 画像urlを格納
const [imgUrl, setimgUrl] = useState<string>("");
// textを格納
const [text, setText] = useState<string>("");

useEffect(()=>{
firebasePostDetails(postid,userid).then((postData)=>{
setimgUrl(postData.Imgurl)
setText(postData.Caption)
})
})

const Updata = ((e:any)=>{
console.log(text)
FirestoreUpdata(postid,text)
})

return (
<>
<Header show={true} />
<div>
<img alt="" src={imgUrl} />
<textarea  value={text} onChange={(e)=>{setText(e.target.value)}}></textarea>
<Link to="/"><button onClick={Updata}>編集完了</button></Link>
<BackBtn />
</div>
<Footer />
</>
);
}


export default PostEditing;
