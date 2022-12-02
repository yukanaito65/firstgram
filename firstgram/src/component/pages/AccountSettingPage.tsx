import Header from "../molecules/Header";
import Footer from "../molecules/Footer";
import LoginUserDtataTable from "../organisms/LoginUserDataTable";
import BackBtn from "../atoms/button/BackBtn";
import { Link } from "react-router-dom";

function AccountSettingPage() {
  return (
    <>
      <Header show={true} />
      <div className="accountSetting">
        <div>
          <BackBtn />
          <h1 className="accountSetting__title">プロフィール</h1>
        </div>
        <LoginUserDtataTable />
        <div className="accountSetting__btns">
          <Link to="/passwordChange">
            <button className="accountSetting__passChangeBtn">パスワード変更</button>
          </Link>

          <Link to="/AccountEditPage">
            <button>プロフィール編集</button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AccountSettingPage;
