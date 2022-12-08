import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import LoginUserDtataTable from "../organisms/LoginUserDataTable";
import { Link } from "react-router-dom";

function AccountSettingPage() {
  return (
    <>
      <Header show={true} />
      <div className="accountSetting">
        <div>
          <h1 className="accountSetting__title">プロフィール</h1>
        </div>
        <LoginUserDtataTable />
        <div className="accountSetting__btns">
          <Link to="/passwordChange">
            <button className="accountSetting__btns--passChangeBtn accountSetting__btns btn">パスワード変更</button>
          </Link>

          <Link to="/AccountEditPage">
            <button className="accountSetting__btns btn">プロフィール編集</button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AccountSettingPage;
