import Icon from "../atoms/icon/Icon";
import { GetLoginUserData } from "../utils/GetLoginUserAllData";

function LoginUserDataTable() {
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
          <div>
            <Icon />
          </div>

          <table className="setting_table">
            <tr className="setting_table_tr">
              <td className="setting_table_title setting_table_td">
                ユーザーネーム
              </td>
              <td className="setting_table_td">{userNameValue}</td>
            </tr>

            <tr className="setting_table_tr">
              <td className="setting_table_title setting_table_td">名前</td>
              <td className="setting_table_td">{nameValue}</td>
            </tr>

            <tr className="setting_table_tr">
              <td className="setting_table_title setting_table_td">自己紹介</td>
              <td className="setting_table_td">{profileValue}</td>
            </tr>

            <tr className="setting_table_tr">
              <td className="setting_table_title setting_table_td">
                メールアドレス
              </td>
              <td className="setting_table_td">{emailValue}</td>
            </tr>

            <tr className="setting_table_tr">
              <td className="setting_table_title setting_table_td">
                パスワード
              </td>
              <td className="setting_table_td">****</td>
            </tr>
          </table>
        </>
      ) : (
        <p>データが表示されません</p>
      )}
    </>
  );
}

export default LoginUserDataTable;
