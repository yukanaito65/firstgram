import React from 'react';
import Input from './component/atoms/Input';
import { db } from './firebase';
import Icon from './component/atoms/Icon';
import { useEffect, useState } from 'react';
import {collection, getDocs} from 'firebase/firestore';

function App() {
    // const database = db.collection("user")
    // console.log(db)

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
      <header className="App-header">
        <p>
          おはよう
        </p>
        <Input type="text" placeholder="検索" />
      </header>
      <Icon />
      <div>
        {users.map((user)=>(
          <div key={user.id}>
          <img src={user.icon} alt="icon" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
