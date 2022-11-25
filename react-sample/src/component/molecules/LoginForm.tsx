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

  const handleChange = (e:any)=>{
setLoginEmail(e.target.value);
setLoginPassword(e.target.value);
  }

  return (
    <>
      <form
      onSubmit={handleSubmit}
      style={{lineHeight: "5rem"}}
      >
        <div>
          <input
            type="email"
            name="email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            placeholder="メールアドレス"
            style={{width:"80%", height: "35px", backgroundColor: "#f7f7f7",outline: "solid #d3d3d3", border: "none"}}
          />
        </div>
        {/* <InputEmail handleChange={handleChange} loginEmail={loginEmail}/>
        <InputPass handleChange={handleChange} loginPassword={loginPassword} /> */}
        <div>
          <input
            type="password"
            name="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            placeholder="パスワード"
            style={{width:"80%", height: "35px", backgroundColor: "#f7f7f7",outline: "solid #d3d3d3", border: "none"}}
          />
        </div>
        <LoginButton />
      </form>
    </>
  );
}

export default LoginForm;
