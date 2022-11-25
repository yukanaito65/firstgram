import React, { useState } from "react";
import { IoStorefrontSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

//followerList,link,userId,uid
function FollowerCount(props: any) {
  // const [followerNum, setFollowerNum] = useState<any>(props.followerList.length);

  // const followerNum = useSelector((state:any)=>state.followerCountSlice.follower);

  //ログインユーザーのuid
  //そのページを表示している人のuserIdとfollower配列
  return (
    <div style={{textAlign: "center", width: "80px"}}>
    <Link
      to={props.link}
      state={{
        userId: props.userId,
        follower: props.followerList,
        uid: props.uid,
      }}
    >
      <p>
      <span style={{fontWeight:"bold"}}>{props.followerList.length}</span><br/>
        フォロワー
      </p>
      {/* <div>{followerNum}</div> */}
    </Link>
    </div>
  );
}

export default FollowerCount;
