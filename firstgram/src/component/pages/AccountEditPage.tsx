import React, { useState } from "react";
import { useEffect } from "react";
import type { User } from "../../types/types";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import { GetLoginUserData } from "../utils/GetLoginUserAllData";
import ChangeUserDataBtn from "../atoms/button/ChangeUserDataBtn";
import { useNavigate } from "react-router-dom";
import UpdateIcon from "../utils/UpdateIcon";
import BackBtn from "../atoms/button/BackBtn";
import InputText from "../atoms/Input/InputText";
import Btn from "../atoms/button/Btn";

function AccountEditPage() {
  const LoginUserData: {
    authUserData: any;
    firestoreUserData: User | undefined;
  } = GetLoginUserData();
  const authUserData = LoginUserData.authUserData;
  const firestoreUserData = LoginUserData.firestoreUserData;
  console.log(authUserData.uid);

  const userName = firestoreUserData?.userName;
  const name = firestoreUserData?.name;
  const profile = firestoreUserData?.profile;
  const icon = firestoreUserData?.icon;

  // 各inputの状態管理
  const [userNameValue, setUserNameValue] = useState<string | undefined>(
    userName
  );
  const [nameValue, setNameValue] = useState<string | undefined>(name);
  const [profileValue, setProfileValue] = useState<string | undefined>(profile);
  const [iconValue, setIconValue] = useState<string | undefined>(icon);

  // useNavigateを使えるように定義
  const navigate = useNavigate();

  useEffect(() => {
    setUserNameValue(userName);
    setNameValue(name);
    setProfileValue(profile);
    setIconValue(icon);
  }, [profile]);

  //  確定ボタンクリック時に実行
  const ChangeConfirm = (e: any) => {
    e.preventDefault();
    ChangeUserDataBtn({
      icon: iconValue,
      userName: userNameValue,
      name: nameValue,
      profile: profileValue,
    });
    navigate("/mypage/");
  };

  return (
    <div>
      <Header show={true} />
      <div className="accountEdit__top">
        <BackBtn />
        <h1>プロフィール編集</h1>
      </div>
      {authUserData ? (
        <div>
          <div className="accountEdit__icon">
            <UpdateIcon
              iconPropsFunc={setIconValue}
              iconPropsValue={iconValue}
            />
          </div>
          <table className="accountEdit__userDateTable">
            <tr className="accountEdit__userDateTable--tr">
              <td className="accountEdit__userDateTable--tdTitle">
                <label htmlFor="settingUserName">ユーザーネーム</label>
              </td>
              <td className="accountEdit__userDateTable--tdContent">
                <InputText
                  inputValue={userNameValue}
                  onChange={setUserNameValue}
                  inputName="settingUserName"
                />
              </td>
            </tr>

            <tr className="accountEdit__userDateTable--tr">
              <td className="accountEdit__userDateTable--tdTitle">
                <label htmlFor="settingName">名前</label>
              </td>
              <td className="accountEdit__userDateTable--tdContent">
                <InputText
                  inputValue={nameValue}
                  onChange={setNameValue}
                  inputName="settingName"
                />
              </td>
            </tr>

            <tr className="accountEdit__userDateTable--tr">
              <td className="accountEdit__userDateTable--tdTitle">
                <label htmlFor="settingProfile">自己紹介</label>
              </td>
              <td className="accountEdit__userDateTable--tdContent">
                <textarea
                  value={profileValue}
                  onChange={(e) => setProfileValue(e.target.value)}
                  name="settingProfile"
                />
              </td>
            </tr>
          </table>
          <div className="accountEdit__confirmBtn">
            <Btn onClick={ChangeConfirm} text="更新" className="btn" />
          </div>
        </div>
      ) : (
        <p className="accountEdit__noUserData">データが表示されません</p>
      )}
      <Footer />
    </div>
  );
}

export default AccountEditPage;
