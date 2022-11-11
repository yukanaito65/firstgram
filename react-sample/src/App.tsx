import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Mypage from "./Mypage";
import "./index.css"
import Top from "./Top";
import NewPost from "./NewPost";
import Follow from "./Follow";
import Follower from "./Follower";
import PostDetails from "./PostDetails";
import PostLook from "./PostLook";


function App() {
  return (
    <div className="App">
      <div className="container">
        <BrowserRouter>
          <Routes>
          <Route path={`/mypage/`} element={<Mypage />} />
            <Route path={`/register/`} element={<Register />} />
            <Route path={`/login/`} element={<Login />} />
            <Route path={`/`} element={<Top />} />
            <Route path={`/newPost`} element={<NewPost />} />
            <Route path={`/follow`} element={<Follow />} />
            <Route path={`/follower`} element={<Follower />} />
            <Route path={`/PostDetails`} element={<PostDetails />} />
            <Route path={`/PostLook`} element={<PostLook />} />
          </Routes>
        </BrowserRouter>
      </div>
      </div>
  );
}

export default App;
