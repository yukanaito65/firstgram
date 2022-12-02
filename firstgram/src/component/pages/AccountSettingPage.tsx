import Header from "../molecules/Header";
import Footer from "../molecules/Footer";
import LoginUserDtataTable from "../molecules/LoginUserDataTable";
import BackBtn from "../atoms/button/BackBtn";
import { Link } from "react-router-dom";

function AccountSettingPage() {
  return (
    <>
      <Header show={true} />
      <div>
        <div>
          <BackBtn />
          <h1 className="margin-bottom_20">プロフィール</h1>
        </div>
        <LoginUserDtataTable />
        <div className="to_passChange">
          <Link to="/passwordChange">
            <button>パスワード変更</button>
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
