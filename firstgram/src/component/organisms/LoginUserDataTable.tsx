import Icon from "../atoms/icon/Icon";
import { GetLoginUserData } from "../utils/GetLoginUserAllData";

function LoginUserDtataTable() {
  const LoginUserData = GetLoginUserData();
  const authUserData = LoginUserData.authUserData;
  const firestoreUserData = LoginUserData.firestoreUserData;

  const userNameValue = firestoreUserData?.userName;
  const nameValue = firestoreUserData?.name;
  const profileValue = firestoreUserData?.profile;
  const emailValue = firestoreUserData?.email;

  return (
    <>
      {authUserData ? (
        <>
          <div className="loginUserIcon">
            <Icon />
          </div>

          <table className="userDataTable">
            <tr className="userDataTable__tr">
              <td className="userDataTable__tr--title">
                ユーザーネーム
              </td>
              <td className="userDataTable__tr--content">{userNameValue}</td>
            </tr>

            <tr className="userDataTable__tr">
              <td className="userDataTable__tr--title">名前</td>
              <td className="userDataTable__tr--content">{nameValue}</td>
            </tr>

            <tr className="userDataTable__tr">
              <td className="userDataTable__tr--title">自己紹介</td>
              <td className="userDataTable__tr--content">{profileValue}</td>
            </tr>

            <tr className="userDataTable__tr">
              <td className="userDataTable__tr--title">
                メールアドレス
              </td>
              <td className="userDataTable__tr--content">{emailValue}</td>
            </tr>

            <tr className="userDataTable__tr">
              <td className="userDataTable__tr--title">
                パスワード
              </td>
              <td className="userDataTable__tr--content">****</td>
            </tr>
          </table>
        </>
      ) : (
        <p>データが表示されません</p>
      )}
    </>
  );
}

export default LoginUserDtataTable;
