import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Footer from "./component/molecules/Footer";
import Header from "./component/molecules/Header";
// import Icon from "./component/atoms/Icon";
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
    <Header />
      {/* ログインしている場合、マイページにリダイレクトする設定 */}
      {user ? (
        <Navigate to={`/mypage/`} />
      ) : (
        <>
          <LoginForm />
          <p>
            新規登録は<Link to={`/register/`}>こちら</Link>
          </p>
        </>
      )}
      <Footer />
    </>
  );
}

export default Login;
