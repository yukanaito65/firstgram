import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Mypage from './Mypage';
import './index.css';


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
    </div>
  );
}

export default App;
