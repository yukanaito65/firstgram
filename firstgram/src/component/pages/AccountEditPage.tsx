import React, { useState } from "react";
import { useEffect } from "react";
import type { User } from "../../types/types";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import { GetLoginUserData } from "../data/GetLoginUserData";
import ChangeUserDataBtn from "../atoms/button/ChangeUserDataBtn";
import { useNavigate } from "react-router-dom";
import UpdateIcon from "../data/UpdateIcon";
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
  const icon = firestoreUserData?.icon

   // 各inputの状態管理
   const [userNameValue, setUserNameValue] = useState<string | undefined>(userName);
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
   },[profile])

  //  確定ボタンクリック時に実行
  const ChangeConfirm = (e: any) => {
    e.preventDefault();
    ChangeUserDataBtn({
      icon: iconValue,
      userName: userNameValue,
      name: nameValue,
      profile: profileValue,
    });
    navigate("/mypage/")
  };

  return (
    <div>
      <Header show={true} />
      <h1 className="margin-bottom_20">プロフィール編集</h1>
      {authUserData ? (
        <div>
        <UpdateIcon iconPropsFunc={setIconValue} iconPropsValue={iconValue} />
            
            <table className="setting_table">
            <tr className="setting_table_tr">
              <td className="setting_table_title">
                <label htmlFor="settingUserName">ユーザーネーム</label>
              </td>
              <td className="setting_table_content">
              <InputText
                inputValue={userNameValue}
                onChange={setUserNameValue}
                inputName="settingUserName"
              />
              </td>
            </tr>

            <tr className="setting_table_tr">
              <td className="setting_table_title">
                <label htmlFor="settingName">名前</label>
              </td>
              <td className="setting_table_content">
                <InputText
                inputValue={nameValue}
                onChange={setNameValue}
                inputName="settingName"
              />
              </td>
            </tr>

            <tr className="setting_table_tr">
              <td className="setting_table_title">
                <label htmlFor="settingProfile">自己紹介</label>
              </td>
              <td className="setting_table_content">
                <textarea
                  value={profileValue}
                  onChange={(e) => setProfileValue(e.target.value)}
                  name="settingProfile"
                  cols={40}
                  rows={3}
                />
              </td>
            </tr>
          </table>
          <div className="confirm_btn">
            <Btn onClick={ChangeConfirm} text="更新" className="changeUserBtn" />
          </div>
          <BackBtn />
        </div>
      ) : (
        <p className="text-align_center">データが表示されません</p>
      )}
      <Footer />
    </div>
  );
}

export default AccountEditPage;
