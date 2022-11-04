import React from 'react';
import Icon from './component/atoms/Icon';
import FollowButton from './component/atoms/button/FollowButton';

function App() {

  return (
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

    </div>
  );
}

export default App;
