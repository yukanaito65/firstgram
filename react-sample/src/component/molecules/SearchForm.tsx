import React from 'react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import { useState } from 'react';

function SearchForm() {

    const [inputState, setInputState] = useState<any>("");

  return (
    <div>
        <div>
          <Input
          type="search"
          placeholder="検索"
          value={inputState}
          onChange={(e) => setInputState(e.target.value)} />
        </div>

        <div>
          <Button 
          border="none"
          color="pink"
          height = "50px"
          onClick={() => console.log("You clicked on the pink circle!")}
          radius = "10%"
          width = "100px"
          children = "クリック" />
        </div>
    </div>
  )
}

export default SearchForm
