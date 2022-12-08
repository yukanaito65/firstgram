import React, { useState } from "react";
import {
  getAuth,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword as firebaseUpdatePassword,
} from "firebase/auth";
import { Link } from "react-router-dom";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { GetLoginUserData } from "../data/GetLoginUserData";
import BackBtn from "../atoms/button/BackBtn";

export function PsswordChange() {
  const auth = getAuth();
  const currentUser: any = auth.currentUser;

  const [nowPassValue, setNowPassValue] = useState<any>("");
  const [newPassValue, setNewPassValue] = useState<any>("");
  const [cNewPassValue, setCNewPassValue] = useState<any>("");
  const [isRevealNowPassword, setIsRevealNowPassword] = useState(false);
  const [isRevealNewPassword, setIsRevealNewPassword] = useState(false);
  const [isRevealConfirmPassword, setIsRevealConfirmPassword] = useState(false);

  const [errMessage, setErrMessage] = useState<string>("");

  const LoginUserData = GetLoginUserData();
  const authUserData = LoginUserData.authUserData;
  const firestoreUserData = LoginUserData.firestoreUserData;
  const loginUserEmail = firestoreUserData?.email;

  // パスワードの変更関数を定義(Authentication)
  const updatePassword = (
    oldPassword: string,
    newPassword: string
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (currentUser == null) {
        return reject();
      }

      // クレデンシャルの取得
      const credential = EmailAuthProvider.credential(
        currentUser.email || "",
        oldPassword
      );

      // メールアドレスの再認証
      reauthenticateWithCredential(currentUser, credential)
        .then((userCredential) => {
          // パスワードの更新
          firebaseUpdatePassword(userCredential.user, newPassword)
            .then(() => resolve())
            .catch((error) => reject(error));
        })
        .catch((error) => reject(setErrMessage("現在のパスワードが違います")));
    });
  };

  //   Authenticationを更新
  const dataUpdate: () => void = () => {
    // パスワード変更
    updatePassword(nowPassValue, newPassValue);
  };

  // パスワードの表示/非表示
  const toggleNowPassword = () => {
    setIsRevealNowPassword((prevState) => !prevState);
  };
  const toggleNewPassword = () => {
    setIsRevealNewPassword((prevState) => !prevState);
  };

  const toggleConfirmPassword = () => {
    setIsRevealConfirmPassword((prevState) => !prevState);
  };

  return (
    <>
      {authUserData ? (
        <div>
          <Header show={true} />
          <div className="accountEdit__top">
            <BackBtn />
            <h1>アカウント情報変更</h1>
          </div>
          <table className="passwordChangeTable">
            <tr className="passwordChangeTable__tr">
              <td className="passwordChangeTable__tr--tdTitle">
                <label htmlFor="settingEmail">現在のメールアドレス</label>
              </td>
              <td className="passwordChangeTable__tr--Content">
                <p>{loginUserEmail}</p>
              </td>
            </tr>

            <tr className="passwordChangeTable__tr">
              <td className="passwordChangeTable__tr--tdTitle">
                <label htmlFor="settingPassword">現在のパスワード</label>
              </td>
              <td className="passwordChangeTable__tr--tdContent">
                <div className="passwordChangeTable__tr--tdInput">
                  <input
                    type={isRevealNowPassword ? "text" : "password"}
                    value={nowPassValue}
                    onChange={(e) => setNowPassValue(e.target.value)}
                    name="settingPassword"
                    id="settingPassword"
                  ></input>
                  <div
                    onClick={toggleNowPassword}
                    role="presentation"
                    className="isRevealPassword_icon"
                  >
                    {isRevealNowPassword ? (
                      <AiFillEye className="passwordChangeTable__icon" />
                    ) : (
                      <AiFillEyeInvisible className="passwordChangeTable__icon" />
                    )}
                  </div>
                </div>
                <span>{errMessage}</span>
              </td>
            </tr>

            <tr className="passwordChangeTable__tr">
              <td className="passwordChangeTable__tr--tdTitle">
                <label htmlFor="settingPassword">新しいパスワード</label>
              </td>
              <td className="passwordChangeTable__tr--tdContent">
                <div className="passwordChangeTable__tr--tdInput">
                  <input
                    type={isRevealNewPassword ? "text" : "password"}
                    value={newPassValue}
                    onChange={(e) => setNewPassValue(e.target.value)}
                    name="settingPassword"
                    id="settingPassword"
                    placeholder="5文字以上"
                  ></input>
                  <div
                    onClick={toggleNewPassword}
                    role="presentation"
                    className="isRevealPassword_icon"
                  >
                    {isRevealNewPassword ? (
                      <AiFillEye className="passwordChangeTable__icon" />
                    ) : (
                      <AiFillEyeInvisible className="passwordChangeTable__icon" />
                    )}
                  </div>

                  {0 < newPassValue.length && newPassValue.length < 6 && (
                    <p>5文字以上を入力してください</p>
                  )}
                </div>
              </td>
            </tr>

            <tr className="passwordChangeTable__tr">
              <td className="passwordChangeTable__tr--tdTitle">
                <label htmlFor="settingCPassword">
                  新しいパスワード（確認）
                </label>
              </td>
              <td className="passwordChangeTable__tr--tdContent">
                <div className="passwordChangeTable__tr--tdInput">
                  <input
                    type={isRevealConfirmPassword ? "text" : "password"}
                    value={cNewPassValue}
                    onChange={(e) => setCNewPassValue(e.target.value)}
                    name="settingCPassword"
                    id="settingCPassword"
                    placeholder="再度パスワードを入力"
                  ></input>
                  <div
                    onClick={toggleConfirmPassword}
                    role="presentation"
                    className="isRevealPassword_icon"
                  >
                    {isRevealConfirmPassword ? (
                      <AiFillEye className="passwordChangeTable__icon" />
                    ) : (
                      <AiFillEyeInvisible className="passwordChangeTable__icon" />
                    )}
                  </div>

                  {newPassValue.length > 0 &&
                    newPassValue !== cNewPassValue && (
                      <p>
                        新しいパスワードと新しいパワード(確認)が一致していません
                      </p>
                    )}
                </div>
              </td>
            </tr>
          </table>

          <div className="passwordChangeTable__confirmBtn">
            {newPassValue.length > 4 && newPassValue === cNewPassValue ? (
              <button onClick={dataUpdate} className="btn">
                確定
              </button>
            ) : (
              <button className="passwordChangeTable__confirmBtn--noPushBtn">
                確定
              </button>
            )}
          </div>

          <Footer />
        </div>
      ) : (
        <div>
          <p>ログインしてください</p>
          <Link to={"/login"}>ログイン画面へ</Link>
        </div>
      )}
    </>
  );
}

export default PsswordChange;
