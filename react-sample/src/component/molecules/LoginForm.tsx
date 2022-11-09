import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";

function LoginForm() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // signInWithEmailAndPasswordを実行することでログインを行う
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    } catch (error) {
      alert("メールアドレスまたはパスワードが間違っています");
    }
  };

  // //ログインを判定する設定
  // const [user, setUser] = useState();

  // //onAuthStateChangedでログインしているかどうかを監視
  // useEffect(() => {
  //   onAuthStateChanged(auth, (currentUser: any) => {
  //     setUser(currentUser);
  //   });
  // });

  return (
    <>
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>メールアドレス</label>
          <input
            type="email"
            name="email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
        </div>
        <div>
          <label>パスワード</label>
          <input
            type="password"
            name="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
        </div>
        <button>ログイン</button>
      </form>
    </>
  );
}

export default LoginForm;
