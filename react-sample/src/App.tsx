import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Mypage from "./Mypage";
import "./index.css";

import Icon from "./component/atoms/Icon";
import FollowButton from "./component/atoms/button/FollowButton";
import DmButton from "./component/atoms/button/DmButton";

import { GetUsersData } from "./component/GetUsersData";
import { IoEllipsisHorizontal } from "react-icons/io5";
import InputImage from "./NewPost";
import NewPost from "./NewPost";



function App() {
  return (
    <div className="App">
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path={`/register/`} element={<Register />} />
            <Route path={`/login/`} element={<Login />} />
            <Route path={`/`} element={<Mypage />} />
            <Route path={`/NewPost`} element={<NewPost />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
