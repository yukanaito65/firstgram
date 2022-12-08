import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Logo from "../atoms/pictures/Logo";
import Header from "../organisms/Header";
import LoginForm from "../molecules/LoginForm";
import { auth } from "../../firebase";

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
          <div className="login">
            <div className="login__iphone">
              <img
                src={`${process.env.PUBLIC_URL}/iphone.png`}
                alt="iphone"
                className="login__img"
              />
            </div>
            <div className="login__contents">
              <h1 className="login__logo">
                <Logo />
              </h1>
              <LoginForm />

              <p>
                アカウントをお持ちでないですか？
                <br />
                <Link to={`/register`}>
                  <span className="login__link">登録する</span>
                </Link>
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Login;
