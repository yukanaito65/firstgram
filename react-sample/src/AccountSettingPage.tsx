import React, { useState } from "react";
import { auth } from "./firebase";
import { db } from "./firebase";
import {
  getDoc,
  doc,
  collection,
  updateDoc,
  CollectionReference,
} from "firebase/firestore";
import { useEffect } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import type { User } from "./types/types";
import Icon from "./component/atoms/pictures/Icon";
import { Link } from "react-router-dom";

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
        setPasswordValue(userDataId.password);

        console.log("ログイン状態です");
      }
    });
  }, []);

  // 各inputの状態管理
  const [userNameValue, setUserNameValue] = useState<any>("");
  const [nameValue, setNameValue] = useState<any>("");
  const [profileValue, setProfileValue] = useState<any>("");
  const [emailValue, setEmailValue] = useState<any>("");
  const [passwordValue, setPasswordValue] = useState<any>("");

  return (
    <div>
      <h1>設定</h1>
      {user ? (
        <>
          <div>
            <Icon />
          </div>
          <div>
            <p>ユーザーネーム</p>
            <p>{userNameValue}</p>
          </div>

          <div>
            <p>名前</p>
            <p>{nameValue}</p>
          </div>

          <div>
            <p>自己紹介</p>
            <p>{profileValue}</p>
          </div>

          <div>
            <p>メールアドレス</p>
            <p>{emailValue}</p>
          </div>

          <div>
            <p>パスワード</p>
            <p>{passwordValue}</p>
          </div>

          <Link to="/AccountEditPage">
            <button>編集</button>
          </Link>
          <Link to="/">
            <button>戻る</button>
          </Link>
        </>
      ) : (
        <p>データが表示されません</p>
      )}
    </div>
  );
}

export default AccountSettingPage;
