import Header from "../molecules/Header";
import Footer from "../molecules/Footer";
import LoginUserDtataTable from "../molecules/LoginUserDataTable";
import BackBtn from "../atoms/button/BackBtn";

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
      </div>
      <Footer />
    </>
  );
}

export default AccountSettingPage;
