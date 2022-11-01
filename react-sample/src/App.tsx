
import React, { useState } from 'react';
import Input from './component/atoms/Input';
import { db } from './firebase';

function App() {
    // const database = db.collection("user")
    console.log(db)
  return (
    <div className="App">
      <header className="App-header">
        <p>
          おはよう
        </p>
        <Input type="text" placeholder="検索" />
      </header>
    </div>
  );
}

export default App;
