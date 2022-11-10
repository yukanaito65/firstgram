import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Mypage from "./Mypage";
import "./index.css"
import Top from "./Top";
import NewPost from "./NewPost";
import Follow from "./Follow";
import Follower from "./Follower";

function App() {
  return (
    <div className="App">
      <div className="container">
        <BrowserRouter>
          <Routes>
          <Route path={`/`} element={<Mypage />} />
            <Route path={`/register/`} element={<Register />} />
            <Route path={`/login/`} element={<Login />} />
            <Route path={`/top/`} element={<Top />} />
            <Route path={`/newPost`} element={<NewPost />} />
            <Route path={`/follow`} element={<Follow />} />
            <Route path={`/follower`} element={<Follower />} />
          </Routes>
        </BrowserRouter>
      </div>
      </div>
  );
}

export default App;
