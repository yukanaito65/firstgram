import Icon from './component/atoms/Icon';
import FollowButton from './component/atoms/button/FollowButton';
import { GetUsersData } from './component/GetUsersData';
import { IoEllipsisHorizontal } from "react-icons/io5"

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
    <IoEllipsisHorizontal />

    
  </div>
);
}

export default App;
