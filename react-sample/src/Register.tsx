import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { auth } from "./firebase";
import { db } from "./firebase";
import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import Icon from "./component/atoms/Icon";
import InputImage from "./component/atoms/Input/InputImage";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "./firebase-sec";
// import InputIconUpload from "./component/atoms/Input/InputIconUpload";

function Register() {
  //Authenticationに登録するemailとpassword
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");



   //loadingしているかしてないか監視する
   const [loading, setLoading] = useState(false);
    // アップロードが完了したか確認する
    const [isUploaded, setIsUploaded] = useState(false);
  const [imgSrc, setImgSrc] = useState("");

  const [reference, setReference] = useState<any>("");


  //画像アップロード＆URL取得
  const InputImage = (e: any) => {
    const file = e.target.files[0];

    // パスと名前で参照を作成
    const storageRef = ref(storage, "image/" + file.name);
    // 画像のアップロード
    // uploadBytesResumable(storageRef, file);
    // setReference(storageRef);
    // 画像のアップロード
    const uploadImage = uploadBytesResumable(storageRef, file);
    uploadImage.on("state_changed",
    // upload開始したらloading中になる(loadingがtureになる)
    (snapshot) => {
        setLoading(true);
    },
    (err) =>{
        console.log(err);
    },
    //upload完了したらloadedになる(loadingがfalse,loadedがtrue)
    () =>{
        setLoading(false);
        setIsUploaded(true);

        getDownloadURL(storageRef)
        .then(url => {
        setImgSrc(url)
        })
})



    // // 画像のダウンロード
    // getDownloadURL(storageRef)
    //   .then((url) => {
    //     setImgSrc(url);
    //     console.log("画像のurlは" + url);
    //     console.log(imgSrc);
    //   })
    //   .catch((err) => console.log(err));
  };

  //idを保管
  // const [iconUserId,setIconUserId] = useState<any>("")

  //ログイン状態保持(userが値を持てばログイン状態)
  const [user, setUser] = useState<any>("");

  //Authenticationへのユーザー登録、FireStoreへのデータ新規追加
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      //Authenticationへのユーザー登録
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );

      //FireStoreへのデータ新規追加
      const { userName, name, Cpassword } = e.target.elements;
      console.log(userName.value);

      //  const InputImage = (e:any) => {
      //   const file = e.target.files[0];

      //   // パスと名前で参照を作成
      //   const storageRef = ref(storage,"image/"  + file.name);
      //   // 画像のアップロード
      //   uploadBytesResumable(storageRef, file);
      //   // 画像のダウンロード
      //   getDownloadURL(storageRef)
      //   .then(url => {
      //   setImgSrc(url)
      //   console.log("画像のurlは" + url)
      //   })
      //   .catch(err => console.log(err))
      //   }


  // getDownloadURL(reference)
  // .then((url) => {
  //   setImgSrc(url);
  //   console.log("画像のurlは" + url);
  //   console.log(imgSrc);
  // })
  // .catch((err) => console.log(err));

      //ログイン判定
      onAuthStateChanged(auth, async (user) => {
        if (!user) {
          console.log("ログアウト状態です");
        } else {
          //ログイン済みユーザーのドキュメントへの参照を取得
          const docRef = doc(db, "user", user.uid);

          //上記を元にドキュメントのデータを取得
          const userDoc = await getDoc(docRef);

          //propsで渡す用
          // const userDataId = userDoc.data();
          // setIconUserId(userDataId);


          // 画像のダウンロード
          //これだとコンソールには出力されるけど、ImagSrcには入ってなさそう
    // getDownloadURL(reference)
    // .then((url) => {
    //   setImgSrc(url);
    //   console.log("画像のurlは" + url);
    //   console.log(imgSrc);
    // })
    // .catch((err) => console.log(err));

          //exists()でドキュメントの存在の有無を確認
          if (!userDoc.exists()) {
            //FireStoreにユーザー用のドキュメントが作られていなければ新規作成
            setDoc(docRef, {
              userId: user.uid,
              email: registerEmail,
              userName: userName.value,
              name: name.value,
              password: registerPassword,
              Cpassword: Cpassword.value,
              icon: imgSrc,
            });
          }
        }
      });
    } catch (error) {
      alert("正しく入力してください");
    }
  };

  //ログインしているかどうかを判断する
  //onAuthStateChanged関数はfirebaseの関数
  //ログイン判定は1度だけでいいからuseEffectを使用
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <>
      {/* ログインしていればマイページを表示。Navigateで指定したページにリダイレクトする */}
      {user ? (
        <Navigate to={`/`} />
      ) : (
        <>
          <h1>会員登録</h1>
          {/* 登録ボタンを押した時にhandleSubmitを実行 */}
          <form onSubmit={handleSubmit}>



              {/* <InputIconUpload id={iconUserId.userId}/> */}
              <div>
              <label>Icon</label>
                {/* <p>JpegかPngの画像ファイル</p>
                <input
                  name="icon"
                  id="icon"
                  type="file"
                  accept=".png, .jpeg, .jpg"
                  // value={imgSrc}
                  onChange={InputImage}
                />
                <img alt="" src={imgSrc} /> */}

          {loading ? (
           <>
              <p>uploading</p>
              <input name="imageURL" type="file" accept=".png, .jpeg, .jpg"
            onChange={ InputImage }/>
             </>
          ) : (
           <>
          {isUploaded ? (
            <img alt="" src={imgSrc} />
          ):(
            <input name="imageURL" type="file" accept=".png, .jpeg, .jpg"
              onChange={ InputImage } />
          )}
          </>
          )}
              </div>
            <div>
              <label>メールアドレス</label>
              <input
                type="email"
                name="email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
              />
            </div>
            <div>
              <label>ユーザーネーム</label>
              <input type="text" name="userName" />
            </div>
            <div>
              <label>ネーム</label>
              <input type="text" name="name" />
            </div>
            <div>
              <label>パスワード</label>
              <input
                type="password"
                name="password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
            </div>
            <div>
              <label>確認用パスワード</label>
              <input type="password" name="Cpassword" />
            </div>
            <button>登録</button>
            <p>
              ログインは<Link to={`/login/`}>こちら</Link>
            </p>
          </form>
        </>
      )}
      {/* <Icon /> */}
    </>
  );
}

export default Register;
