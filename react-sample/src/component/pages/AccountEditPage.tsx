import React, { useState } from "react";
import { db } from "../../firebase";
import {
  getDoc,
  doc,
  collection,
  updateDoc,
  CollectionReference,
} from "firebase/firestore";
import { useEffect } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import type { User } from "../../types/types";
import { Link,useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";
import { getAuth } from "firebase/auth";
import Header from "../molecules/Header";
import Footer from "../molecules/Footer";
import { IoIosArrowBack } from "react-icons/io"

function AccountEditPage() {
  //ログイン状態を保持
  //Authenticationに登録されている情報を持つ
  const [user, setUser] = useState<any>("");
  // 各inputの状態管理
  const [userNameValue, setUserNameValue] = useState<any>("");
  const [nameValue, setNameValue] = useState<any>("");
  const [profileValue, setProfileValue] = useState<any>("");
  const [iconValue, setIconValue] = useState<any>("");

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

        // 上記を元にドキュメントへの参照を取得
        const docDtata = doc(userCollectionRef, user.uid);

        // 上記を元にドキュメントのデータを取得
        const userDocId = await getDoc(docDtata);

        // 取得したデータから必要なものを取り出す
        const userDataId: any = userDocId.data();

        // inputの初期値を取得データに変更
        setUserNameValue(userDataId.userName);
        setNameValue(userDataId.name);
        setProfileValue(userDataId.profile);
        setIconValue(userDataId.icon);

        console.log("ログイン状態です");
      }
    });
  }, []);

  // Authenticationの変更
  const auth = getAuth();
  const navigate = useNavigate();

  // 確定時にfiresoterにデータ送信
  const handleSubmit = (e: any) => {
    e.preventDefault();

    const userCollectionRef = collection(
      db,
      "user"
    ) as CollectionReference<User>;
    const docDtata = doc(userCollectionRef, user.uid);

    updateDoc(docDtata, {
      icon: iconValue,
      userName: userNameValue,
      name: nameValue,
      profile: profileValue,
    });
    navigate("/mypage");
  };

  //loadingしているかしてないか監視する
  const [loading, setloading] = useState(false);
  // アップロードが完了したか確認する
  const [isUploaded, setIsUploaded] = useState(false);

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
      () => {
        setloading(true);
      },
      (err) => {
        console.log(err);
      },
      //upload完了したらloadedになる(loadingがfalse,loadedがtrue)
      () => {
        setloading(false);
        setIsUploaded(true);
        // 画像のダウンロード
        getDownloadURL(storageRef).then((url) => {
          setIconValue(url);
        });
      }
    );
  };

  return (
    <div>
      <Header show={true} />
      <h1 className="margin-bottom_20">プロフィール編集</h1>
      {user ? (
        <>
            <table className="setting_table">
            {loading ? (
              <p>アップロード中</p>
            ) : (
              <>
                {isUploaded ? (
                  <tr>
                    <td className="icon-image setting_table_td">
                    <img alt="ユーザーアイコン" src={iconValue} />
                    </td>
                    <td className="setting_table_td">
                    <input
                      name="settingIcon"
                      type="file"
                      accept=".png, .jpeg, .jpg"
                      onChange={InputImage}
                    />
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td className="icon-image setting_table_td">
                    <img alt="ユーザーアイコン" src={iconValue} />
                    </td>
                    <td className="setting_table_td">
                    <input
                      name="settingIcon"
                      type="file"
                      accept=".png, .jpeg, .jpg"
                      onChange={InputImage}
                    />
                    </td>
                  </tr>
                )}
              </>
            )}
            
            <tr>
              <td className="setting_table_title setting_table_td">
              <label htmlFor="settingUserName">ユーザーネーム</label>
              </td>
              <td className="setting_table_content setting_table_td">
              <input
                type="text"
                value={userNameValue}
                onChange={(e) => setUserNameValue(e.target.value)}
                name="settingUserName"
                id="settingUserName"
              ></input>
              </td>
            </tr>

            <tr>
              <td className="setting_table_title setting_table_td">
              <label htmlFor="settingName">名前</label>
              </td>
              <td className="setting_table_content setting_table_td">
              <input
                type="text"
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
                name="settingName"
                id="settingName"
              ></input>
              </td>
            </tr>

            <tr>
              <td className="setting_table_title setting_table_td">
              <label htmlFor="settingProfile">自己紹介</label>
              </td>
              <td className="setting_table_content setting_table_td">
              <textarea
                value={profileValue}
                onChange={(e) => setProfileValue(e.target.value)}
                name="settingProfile"
                id="settingProfile"
                cols={40}
                rows={3}
              ></textarea>
              </td>
            </tr>
            </table>
            <div className="confirm_btn">
              <button onClick={handleSubmit}>確定</button>
            </div>
            <div>
          <Link to="/AccountSettingPage">
            <IoIosArrowBack size={40} color="white" className="to_back"/>
          </Link>
          </div>
        </>
      ) : (
        <p>データが表示されません</p>
      )}
      <Footer />
    </div>
  );
}

export default AccountEditPage;
