import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Logo from "../atoms/pictures/Logo";
import Header from "../molecules/Header";
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
          <div style={{ display: "flex" }}>

            <div style={{ width: "50%", height: "50%" }}>
              <img
                src={`${process.env.PUBLIC_URL}/iphone.png`}
                alt="Iphone"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <div
              style={{
                backgroundColor: "#ffff",
                outline: "solid #d3d3d3",
                textAlign: "center",
                width: "35%",
              }}
            >
              <h1
                style={{ width: "100px", height: "100px", margin: "10% auto" }}
              >
                <Logo />
              </h1>
              <LoginForm />

              <p>
                アカウントをお持ちでないですか？<br />
                <Link to={`/register`}>
                  <span style={{ color: "#0d6efd" }}>登録する</span>
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
