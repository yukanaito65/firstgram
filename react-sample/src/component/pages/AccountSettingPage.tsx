import React, { useState } from "react";
import { auth } from "../../firebase";
import { db } from "../../firebase";
import {
  getDoc,
  doc,
  collection,
  CollectionReference,
} from "firebase/firestore";
import { useEffect } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import type { User } from "../../types/types";
import Icon from "../atoms/pictures/Icon";
import { Link } from "react-router-dom";
import Header from "../molecules/Header";
import Footer from "../molecules/Footer";
import { IoIosArrowBack } from "react-icons/io"

function AccountSettingPage() {
  //ログイン状態を保持
  //Authenticationに登録されている情報を持つ
  const [user, setUser] = useState<any>("");
  const [userDocRefId, setUserDocRefId] = useState<any>("");

  useEffect(() => {
    //ログイン判定
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.log("ログアウト状態です");
      } else {
        //ログイン情報をuserに代入
        setUser(user);

        //コレクションへの参照を取得
        const userCollectionRef = collection(
          db,
          "user"
        ) as CollectionReference<User>;
        console.log(userCollectionRef);

        // 上記を元にドキュメントへの参照を取得
        setUserDocRefId(doc(userCollectionRef, user.uid));
        console.log(doc(userCollectionRef, user.uid));
        const docDtata = doc(userCollectionRef, user.uid);

        // 上記を元にドキュメントのデータを取得
        const userDocId = await getDoc(docDtata);

        // 取得したデータから必要なものを取り出す
        const userDataId: any = userDocId.data();

        // inputの初期値を取得データに変更
        setUserNameValue(userDataId.userName);
        setNameValue(userDataId.name);
        setProfileValue(userDataId.profile);
        setEmailValue(userDataId.email);

        console.log("ログイン状態です");
      }
    });
  }, []);

  // 各inputの状態管理
  const [userNameValue, setUserNameValue] = useState<any>("");
  const [nameValue, setNameValue] = useState<any>("");
  const [profileValue, setProfileValue] = useState<any>("");
  const [emailValue, setEmailValue] = useState<any>("");

  return (
    <>
      <Header />
      <div>
        <h1 className="margin-bottom_20">プロフィール</h1>
        {user ? (
          <>
            <div>
              <Icon />
            </div>
            <table className="setting_table">
              <tr className="setting_block">
                <td className="setting_table_title setting_table_td">
                  ユーザーネーム
                </td>
                <td className="setting_table_td">{userNameValue}</td>
              </tr>

              <tr className="setting_block">
                <td className="setting_table_title setting_table_td">名前</td>
                <td className="setting_table_td">{nameValue}</td>
              </tr>

              <tr className="setting_block">
                <td className="setting_table_title setting_table_td">
                  自己紹介
                </td>
                <td className="setting_table_td">{profileValue}</td>
              </tr>

              <tr className="setting_block">
                <td className="setting_table_title setting_table_td">
                  メールアドレス
                </td>
                <td className="setting_table_td">{emailValue}</td>
              </tr>

              <tr className="setting_block">
                <td className="setting_table_title setting_table_td">
                  パスワード
                </td>
                <td className="setting_table_td">****</td>
              </tr>
            </table>
            <div className="to_passChange">
              <Link to="/passwordChange">
                <button>パスワード変更</button>
              </Link>
            

            
              <Link to="/AccountEditPage">
                <button>プロフィール編集</button>
              </Link>
              </div>
              <div>
              <Link to="/">
                <IoIosArrowBack color="white" size={40} className="to_back" />
              </Link>
            </div>
          </>
        ) : (
          <p>データが表示されません</p>
        )}
      </div>
      <Footer />
    </>
  );
}

export default AccountSettingPage;
