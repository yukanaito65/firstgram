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

import InputName from "./component/atoms/Input/InputName";
import InputPass from "./component/atoms/Input/InputPass";
import InputEmail from "./component/atoms/Input/InputEmail";
import InputSearch from "./component/atoms/Input/InputSearch";
import InputPost from "./component/atoms/Input/InputPost";
import InputImage from "./component/atoms/Input/InputImage";
import InputPulldown from "./component/atoms/Input/InputPulldown";
import InputRadioSearch from "./component/atoms/Input/InputRadioSearch";

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

        <InputName plaseHolder="test" />
        <InputPass plaseHolder="test2" />
        <InputEmail />
        <InputSearch />
        <InputPost plaseHolder="test3" />
        <InputImage />
        <InputPulldown />
        <InputRadioSearch />
      </div>
    </div>
  );
}

export default App;
