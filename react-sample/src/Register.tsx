import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { auth } from "./firebase";
import { db } from "./firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "./firebase-sec";

function Register() {
  //ログイン状態保持(userが値を持てばログイン状態)
  const [user, setUser] = useState<any>("");

  //Authenticationに登録するemailとpassword
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  //loadingしているかしてないか監視する
  const [loading, setLoading] = useState(false);

  // 画像のアップロードが完了したか確認する
  const [isUploaded, setIsUploaded] = useState(false);

  //画像のURL
  const [imgSrc, setImgSrc] = useState("");

  //画像アップロード＆URL取得
  const InputImage = (e: any) => {
    const file = e.target.files[0];

    // パスと名前で参照を作成
    const storageRef = ref(storage, "image/" + file.name);

    // 画像のアップロード
    const uploadImage = uploadBytesResumable(storageRef, file);
    uploadImage.on(
      "state_changed",
      // upload開始したらloading中になる(loadingがtrueになる)
      (snapshot) => {
        setLoading(true);
      },
      (err) => {
        console.log(err);
      },
      //upload完了したらloadedになる(loadingがfalse,loadedがtrue)
      () => {
        setLoading(false);
        setIsUploaded(true);

        getDownloadURL(storageRef).then((url) => {
          setImgSrc(url);
        });
      }
    );
  };

  //Authenticationへのユーザー登録、FireStoreへのデータ新規追加
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      //Authenticationへのユーザー登録
      //登録するのと同時にログインされる
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );

      //FireStoreへのデータ新規追加
      const { userName, name, Cpassword, profile } = e.target.elements;
      console.log(userName.value);

      //ログイン判定
      onAuthStateChanged(auth, async (user) => {
        if (!user) {
          console.log("ログアウト状態です");
        } else {
          //ログイン済みユーザーのドキュメントへの参照を取得
          const docRef = doc(db, "user", user.uid);

          //上記を元にドキュメントのデータを取得
          const userDoc = await getDoc(docRef);

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
              follow: [],
              follower: [],
              posts: [],
              favoritePosts: [],
              keepPosts: [],
              profile: profile.value,
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
      {/* ログインしていればtopを表示。Navigateで指定したページにリダイレクトする */}
      {user ? (
        <Navigate to={`/`} />
      ) : (
        <>
          <h1>会員登録</h1>
          {/* 登録ボタンを押した時にhandleSubmitを実行 */}
          <form onSubmit={handleSubmit}>
            <div>
              <label>Icon</label>
              {loading ? (
                <>
                  <p>uploading</p>
                  <input
                    name="imageURL"
                    type="file"
                    accept=".png, .jpeg, .jpg"
                    onChange={InputImage}
                  />
                </>
              ) : (
                <>
                  {isUploaded ? (
                    <img alt="" src={imgSrc} />
                  ) : (
                    <input
                      name="imageURL"
                      type="file"
                      accept=".png, .jpeg, .jpg"
                      onChange={InputImage}
                    />
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
            <div>
              <label>プロフィール</label>
              <input type="textarea" name="profile" />
            </div>
            <button>登録</button>
            <p>
              ログインは<Link to={`/login`}>こちら</Link>
            </p>
          </form>
        </>
      )}
    </>
  );
}

export default Register;
