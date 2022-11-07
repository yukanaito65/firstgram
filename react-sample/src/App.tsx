import Input from './component/atoms/Input';
import { db } from './firebase';
// import Icon from './component/atoms/Icon';
import { useEffect, useState } from 'react';
import {collection, getDocs} from 'firebase/firestore';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Mypage from './Mypage';
import './index.css';


function App() {
    const [users,setUsers] = useState<any[]>([]);

    useEffect(()=>{
      const userCollectionRef = collection(db, 'user');
      // console.log(userCollectionRef);
      getDocs(userCollectionRef).then((querySnapshot)=>{
        // console.log(querySnapshot);
        // querySnapshot.docs.forEach((doc)=>console.log(doc));
        //保存しているフィールドのデータのみ取得する↓
        // querySnapshot.docs.forEach((doc)=>console.log(doc.data()));
        setUsers(querySnapshot.docs.map((doc)=>({...doc.data(), id:doc.id})));
      });
    },[]);

  return (
    <div className="App">
      {/* <Icon /> */}
      <div>
        {users.map((user:any)=>(
          <div key={user.id}>
          {/* <img src={user.icon} alt="icon" /> */}
          {/* <p>{user.name}</p> */}
          </div>
        ))}
      </div>


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
