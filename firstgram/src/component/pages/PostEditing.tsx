import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import firebasePostDetails from "../utils/firebasePostDetails";
import FirestoreUpdata from "../utils/FirestoreUpdata";
import Footer from "../organisms/Footer";
import Header from "../organisms/Header";
import BackBtn from "../atoms/button/BackBtn";
import Img from "../atoms/pictures/Img";


interface State {
  postid: string;
  userid: string;
}

function PostEditing() {
  // postlookからデータを持ってくる
  const location = useLocation();
  const { postid, userid } = location.state as State;

  // 画像urlを格納
  const [imgUrl, setimgUrl] = useState<string>("");
  // textを格納
  const [text, setText] = useState<string>("");

  useEffect(() => {
    firebasePostDetails(postid, userid).then((postData) => {
      setimgUrl(postData.Imgurl);
      setText(postData.Caption);
    });
  },[]);

  const Updata = (e: any) => {
    FirestoreUpdata(postid, text);
  };

  return (
    <>
      <div className="postediting">
      <Header show={true} />
      <Img imgUrl={imgUrl} />
        <textarea className="postediting__textarea"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }} />

        <div className="postediting__btns">
          <BackBtn />
          <Link to="/">
            <button onClick={Updata} 
            className="postediting__btn btn">
              編集完了
            </button>
          </Link>
        </div>
      <Footer />
      </div>
    </>
  );
}

export default PostEditing;
