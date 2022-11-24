import React, { useState } from "react";
import { IoStorefrontSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

//followerList,link,userId,uid
function FollowerCount(props: any) {
  const [followerNum, setFollowerNum] = useState<any>(
    props.followerList.length
  );

  //ログインユーザーのuid
  //そのページを表示している人のuserIdとfollower配列
  return (
    <Link
      to={props.link}
      state={{
        userId: props.userId,
        follower: props.followerList,
        uid: props.uid,
      }}
    >
      <div>{props.followerList.length}フォロワー</div>
      {/* <div>{followerNum}</div> */}
    </Link>
  );
}

export default FollowerCount;
