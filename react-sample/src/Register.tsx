import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { auth } from "./firebase";
import { db } from "./firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import Icon from "./component/atoms/Icon";

function Register() {
  //Authenticationに登録するemailとpassword
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

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
            <div>icon登録</div>
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
      <Icon />
    </>
  );
}

export default Register;
