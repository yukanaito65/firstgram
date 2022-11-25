import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Header from "./component/molecules/Header";
import LoginForm from "./component/molecules/LoginForm";
import { auth } from "./firebase";

function Login() {
  //ログインを判定する設定
  const [user, setUser] = useState();

  //onAuthStateChangedでログインしているかどうかを監視
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser);
    });
  });

  return (
    <>
    <Header show={false} />
      {/* ログインしている場合、マイページにリダイレクトする設定 */}
      {user ? (
        <Navigate to={`/mypage`} />
      ) : (
        <>
          <LoginForm />
          <p>
            新規登録は<Link to={`/register`}>こちら</Link>
          </p>
        </>
      )}
    </>
  );
}

export default Login;
