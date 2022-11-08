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
import InputImage from "./component/atoms/Input/InputImage";



function App() {
  return (
    <div className="App">
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path={`/register/`} element={<Register />} />
            <Route path={`/login/`} element={<Login />} />
            <Route path={`/`} element={<Mypage />} />
          </Routes>
        </BrowserRouter>
      </div>

      <div>
        <div>
          <p>Inputコンポーネント</p>
          {/* <Input inputType="search" inputPlaceholder="検索" buttonType="button" buttonName="検索" /> */}
        </div>
        <hr />
        <div>
          <p>Iconコンポーネント</p>
          <Icon />
        </div>
        <hr />
        <div>検索コンポーネント</div>
        <FollowButton
          onClick={() => console.log("You clicked on the pink circle!")}
        />
        <hr />
        <DmButton
          onClick={() => console.log("You clicked on the pink circle!")}
        />
        <hr />

      

        <IoEllipsisHorizontal />
        <InputImage />
      </div>
    </div>
  );
}

export default App;
