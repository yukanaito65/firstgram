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
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import storage from "./firebase-sec";

function AccountEditPage() {
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
        setIconValue(userDataId.icon);

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
  const [cPasswordValue, setCPasswordValue] = useState<any>("");
  const [iconValue, setIconValue] = useState<any>("");

  // 確定時にfiresoterにデータ送信
  const handleSubmit = (e: any) => {
    e.preventDefault();
    updateDoc(userDocRefId, {
      icon: imgSrc,
      userName: userNameValue,
      name: nameValue,
      profile: profileValue,
      email: emailValue,
      password: passwordValue,
    });
  };

  //loadingしているかしてないか監視する
  const [loading, setloading] = useState(false);
  // アップロードが完了したか確認する
  const [isUploaded, setIsUploaded] = useState(false);
  // 画像のsrc
  const [imgSrc, setImgSrc] = useState("");

  // 画像の更新
  const InputImage = (e: any) => {
    // パスと名前で参照を作成
    const file = e.target.files[0];
    const storageRef = ref(storage, "image/" + file.name);
    // 画像のアップロード
    const uploadImage = uploadBytesResumable(storageRef, file);
    uploadImage.on(
      "state_changed",
      // upload開始したらloading中になる(loadingがtureになる)
      (snapshot) => {
        setloading(true);
      },
      (err) => {
        console.log(err);
      },
      //upload完了したらloadedになる(loadingがfalse,loadedがtrue)
      () => {
        setloading(false);
        setIsUploaded(true);
      }
    );
    // 画像のダウンロード
    getDownloadURL(storageRef)
      .then((url) => {
        setImgSrc(url);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>設定</h1>
      {user ? (
        <>
          <form onSubmit={handleSubmit}>
          <label htmlFor="settingIcon">アイコン</label>
            {loading ? (
              <p>アップロード中</p>
            ) : (
              <>
                {isUploaded ? (
                  <div>
                    <img alt="" src={imgSrc} />
                    <label>変更</label>
                    <input
                      name="settingIcon"
                      type="file"
                      accept=".png, .jpeg, .jpg"
                      onChange={InputImage}
                    />
                  </div>
                ) : (
                  <div>
                    <img alt="" src={iconValue} />
                    <input
                      name="settingIcon"
                      type="file"
                      accept=".png, .jpeg, .jpg"
                      onChange={InputImage}
                    />
                  </div>
                )}
              </>
            )}

            <div>
              <label htmlFor="settingUserName">ユーザーネーム</label>
              <input
                type="text"
                value={userNameValue}
                onChange={(e) => setUserNameValue(e.target.value)}
                name="settingUserName"
                id="settingUserName"
              ></input>
            </div>

            <div>
              <label htmlFor="settingName">名前</label>
              <input
                type="text"
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
                name="settingName"
                id="settingName"
              ></input>
            </div>

            <div>
              <label htmlFor="settingProfile">自己紹介</label>
              <input
                type="textarea"
                value={profileValue}
                onChange={(e) => setProfileValue(e.target.value)}
                name="settingProfile"
                id="settingProfile"
              ></input>
            </div>

            <div>
              <label htmlFor="settingEmail">メールアドレス</label>
              <input
                type="email"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                name="settingEmail"
                id="settingEmail"
              ></input>
            </div>

            <div>
              <label htmlFor="settingPassword">パスワード</label>
              <input
                type="password"
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                name="settingPassword"
                id="settingPassword"
              ></input>
            </div>

            <div>
              <label htmlFor="settingCPassword">確認用パスワード</label>
              <input
                type="password"
                value={cPasswordValue}
                onChange={(e) => setCPasswordValue(e.target.value)}
                name="settingCPassword"
                id="settingCPassword"
                placeholder="確認のため再度パスワードを入力"
              ></input>
              {cPasswordValue.length > 0 && passwordValue !== cPasswordValue ? (
                <p>パスワードと確認用パスワードが一致していません</p>
              ) : (
                <></>
              )}
            </div>
            <Link to="/mypage/">
            <button>確定</button>
            </Link>
          </form>
          <Link to="/AccountSettingPage">
            <button>戻る</button>
          </Link>
        </>
      ) : (
        <p>データが表示されません</p>
      )}
    </div>
  );
}

export default AccountEditPage;
