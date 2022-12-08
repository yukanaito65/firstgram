import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./component/pages/Register";
import Login from "./component/pages/Login";
import Mypage from "./component/pages/Mypage";
import NewPost from "./component/pages/NewPost";
import AccountEditPage from "./component/pages/AccountEditPage";
import AccountSettingPage from "./component/pages/AccountSettingPage";
import "./index.css"
// import Follow from "./Follow";
// import Follower from "./Follower";
import PostDetails from "./component/pages/PostDetails";
import PostLook from "./component/pages/PostLook";
import PsswordChange from "./component/pages/PsswordChange";
import PostEditing from "./component/pages/PostEditing";

// import FavolitePostLook from "./FavolitePostLook";

import DMPage from "./component/pages/DMPage";
import SearchPage from "./component/pages/SearchPage";
import Profile from "./component/pages/Profile";
import Follow from "./component/pages/Follow";
import Follower from "./component/pages/Follower";
import MyFollower from "./component/pages/MyFollower";
import MyFollow from "./component/pages/MyFollow";
import KeepList from "./component/pages/KeepList";
import Delete from "./component/pages/Delete";



function App() {
  return (
    <div className="App">
      <div className="container">
        <BrowserRouter>
          <Routes>
          <Route path={`/mypage`} element={<Mypage />} />
            <Route path={`/register`} element={<Register />} />
            <Route path={`/login`} element={<Login />} />
            <Route path={`/AccountEditPage`} element={<AccountEditPage />} />
            <Route path={`/AccountSettingPage`} element={<AccountSettingPage />} />
            <Route path={`/`} element={<PostLook />} />
            <Route path={`/newPost`} element={<NewPost />} />
            <Route path={`/myFollow`} element={<MyFollow />} />
            <Route path={`/myFollower`} element={<MyFollower />} />
            <Route path={`/follow`} element={<Follow />} />
            <Route path={`/follower`} element={<Follower />} />
            <Route path={`/PostDetails`} element={<PostDetails />} />
            {/* <Route path="/PostDetails" component={PostDetails} /> */}
            {/* <Route path={`/PostLook`} element={<PostLook />} /> */}
            <Route path={`/passwordChange`} element={<PsswordChange />} />
            <Route path={`/PostEditing`} element={<PostEditing />} />
            <Route path={`/Delete`} element={<Delete />} />

            {/* <Route path={`/FavolitePostLook`} element={<FavolitePostLook />} /> */}

            <Route path={`/dmPage`} element={<DMPage />} />
            <Route path={`/searchPage`} element={<SearchPage />} />
            <Route path={`/profile`} element={<Profile />} />
            <Route path={`/keep`} element={<KeepList />} />
            {/* <Route path={`/InputNewPost`} element={<InputNewPost />} /> */}
          </Routes>
        </BrowserRouter>
      </div>
      </div>
  );
}

export default App;
