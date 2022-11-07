import Icon from './component/atoms/Icon';
import FollowButton from './component/atoms/button/FollowButton';
import DmButton from './component/atoms/button/DmButton';

import { GetUsersData } from './component/GetUsersData';
import { IoEllipsisHorizontal } from "react-icons/io5"

import InputName from './component/atoms/Input/InputName';
import InputPass from './component/atoms/Input/InputPass';
import InputEmail from './component/atoms/Input/InputEmail';
import InputSearch from './component/atoms/Input/InputputSearch';
import InputPost from './component/atoms/Input/InputPost';
import InputImage from './component/atoms/Input/InputImage';


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
    <DmButton 
    onClick={() => console.log("You clicked on the pink circle!")} />
    <hr />

    <IoEllipsisHorizontal />

    


      <InputName plaseHolder="test" />
      <InputPass plaseHolder="test2" />
      <InputEmail />
      <InputSearch />
      <InputPost plaseHolder="test3" />
      <InputImage/>


  </div>
);
}

export default App;
