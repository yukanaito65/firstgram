import { useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";
import { AiOutlineAreaChart } from "react-icons/ai";
import Footer from "../organisms/Footer";
import Header from "../organisms/Header";
import "../../css/newPost.css";
import NewPostUploadAuter from "../molecules/NewPostUploadAuter";
// import InputNewPost from "../atoms/Input/InputNewPost";
import BackBtn from "../atoms/button/BackBtn";
import { Link } from "react-router-dom";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

interface State {
  postid: string;
  userid: string;
}

const NewPost = (props: any) => {
  //loadingしているかしてないか監視する
  const [loading, setloading] = useState(false);
  // アップロードが完了したか確認する
  const [isUploaded, setIsUploaded] = useState(false);
  // 画像のsrc
  const [imgSrc, setImgSrc] = useState("");

  // 画像の更新
  const InputImage = (e: any) => {
    // パスと名前で参照を作成
    const file = e.target.files[0];
    const storageRef = ref(storage, "image/" + file.name);
    // 画像のアップロード
    const uploadImage = uploadBytesResumable(storageRef, file);
    uploadImage.on(
      "state_changed",
      // upload開始したらloading中になる(loadingがtureになる)
      (snapshot) => {
        setloading(true);
      },
      (err) => {
        console.log(err);
      },
      //upload完了したらloadedになる(loadingがfalse,loadedがtrue)
      () => {
        setloading(false);
        setIsUploaded(true);

        getDownloadURL(storageRef).then((url) => {
          setImgSrc(url);
        });
      }
    );
  };
  return (
    <>
      <div className="newpost">
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
                {/* <textarea value={textState} placeholder="コメントを入力してください" onChange={InputText} 
            style={{width:"100%",height:"100px"}} />
            <Link to="/" ><button onClick={OnFirebase}>投稿</button></Link> */}
                {/* <Link to="InputNewPost" state={{ imgSrc:imgSrc }}>次へ</Link> */}
                {/* <InputNewPost /> */}
              </>
            ) : (
              <>
                <BackBtn />
                <div
                  className="newpost__inputfileset"
                  style={{
                    //     border:"solid 1px #333 ",height:"300px", textAlign:"center",
                    // display: "flex",justifyContent: "center",alignItems: "center",flexDirection: "column"
                    height: "473px",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    // alignItems: "center",
                    flexDirection: "column",
                    backgroundColor: "#f2f2f2",
                    /* margin-top: 30px; */
                    width: "70%",
                    margin: " 0 auto",
                    /* border: none; */
                    borderRadius: "10px",
                  }}
                >
                  <p style={{display: "block"}}>新規投稿作成</p>

                  <div style={{alignItems: "center", display: "block"}}>
                    <MdOutlineAddPhotoAlternate
                      className="newpost__inputfileicon"
                      size={40}
                      style={{
                        // alignItems:"center",
                        width: "100%",
                        // margin:"0 auto"
                      }}
                    />

                    <div
                      className="newpost__input"
                      style={{
                        // border: "1px solid",
                        borderRadius: "3px",
                        // display: "inline-block",
                        padding: "3px",
                        position: "relative",
                        backgroundColor: "#0d6efd",
                        margin: "0 auto",
                        alignItems: "center",
                        width: "200px",
                      }}
                    >
                      <p
                        className="newpost__inputletter"
                        style={{ color: "#fff" }}
                      >
                        コンピューターから選択
                      </p>
                      <input
                        className="newpost__file"
                        name="imageURL"
                        type="file"
                        accept=".png, .jpeg, .jpg"
                        onChange={InputImage}
                        // style={{
                        //     height: "100%",
                        //     left: "0",
                        //     opacity: "0",
                        //     position: "absolute",
                        //     top: "0",
                        //     width: "100%"
                        // }}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        <Footer />
      </div>
    </>
  );
};

export default NewPost;
