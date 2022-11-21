import React, { useState } from "react";
import { Link } from "react-router-dom";

function FollowerCount(props: any) {
  const [followerNum, setFollowerNum] = useState<number>(props.followerList.length);

  //ログインユーザーのuid
  //そのページを表示している人のuserIdとfollower配列
  return (
    <Link
      to={"/follower"}
      state={{
        userId: props.userId,
        follower: props.followerList,
        uid: props.uid,
      }}
    >
      <div>{followerNum}フォロワー</div>
    </Link>
  );
}

export default FollowerCount;
