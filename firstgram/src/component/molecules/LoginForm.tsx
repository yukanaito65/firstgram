import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";
import LoginButton from "../atoms/button/LoginButton";
import InputEmail from "../atoms/Input/InputEmail";
import InputPass from "../atoms/Input/InputPass";

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

  const emailChange = (e: any) => {
    setLoginEmail(e.target.value);
  };
  const passChange = (e: any) => {
    setLoginPassword(e.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ lineHeight: "5rem" }}>
        <InputEmail emailChange={emailChange} valueEmail={loginEmail} />
        <InputPass passChange={passChange} valuePassword={loginPassword} />
        <LoginButton />
      </form>
    </>
  );
}

export default LoginForm;
