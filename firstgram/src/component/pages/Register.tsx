import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { auth } from "../../firebase";
import RegisterForm from "../molecules/RegisterForm";
import Logo from "../atoms/pictures/Logo";
import Header from "../molecules/Header";

function Register() {
  // //ログイン状態保持(userが値を持てばログイン状態)
  const [user, setUser] = useState<any>("");

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
    <Header show={false} />
      {/* ログインしていればtopを表示。Navigateで指定したページにリダイレクトする */}
      {user ? (
        <Navigate to={`/`} />
      ) : (
        <>
          <div
            style={{
              backgroundColor: "#ffff",
              outline: "solid #d3d3d3",
              textAlign: "center",
              width: "70%",
              margin: "0 auto"
            }}
          >
            <h1 style={{ width: "100px", height: "100px", margin: "0 auto" }}>
              <Logo />
            </h1>
            <RegisterForm />
            <p>
              アカウントをお持ちですか？
              <Link to={`/login`}>
                <span style={{ color: "#0d6efd" }}>ログインする</span>
              </Link>
            </p>
          </div>
        </>
      )}
    </>
  );
}

export default Register;
