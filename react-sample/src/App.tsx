import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Mypage from "./Mypage";
import "./index.css";
import NewPost from "./NewPost";
import AccountEditPage from "./AccountEditPage";
import AccountSettingPage from "./AccountSettingPage";


function App() {
  return (
    <div className="App">
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path={`/register/`} element={<Register />} />
            <Route path={`/login/`} element={<Login />} />
            <Route path={`/mypage/`} element={<Mypage />} />
            <Route path={`/NewPost`} element={<NewPost />} />
            <Route path={`/AccountEditPage`} element={<AccountEditPage />} />
            <Route path={`/AccountSettingPage`} element={<AccountSettingPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
