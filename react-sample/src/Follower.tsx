import { collection, doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import AddFollowButton from "./component/atoms/button/AddFollowButton";
import FollowButton from "./component/atoms/button/FollowButton";
import RemoveFollowButton from "./component/atoms/button/RemoveFollowButton";
import CommonIcon from "./component/atoms/pictures/CommonIcon";
import { db } from "./firebase";

interface State {
  userId: string;
  follower: string[];
  uid: string;
}

function Follower() {
  const [followerUsers, setFollowerUsers] = useState<any>([]);

  //各ページからデータ取得
  const location = useLocation();
  const { userId, follower, uid } = location.state as State;

  useEffect(() => {
    const followerArray: any = [];

    follower.map(async (followerUserId: any) => {
      const userCollectionRef = collection(db, "user");

      const userDocRefId = doc(userCollectionRef, followerUserId);

      const userDocId = await getDoc(userDocRefId);

      const userDataId = userDocId.data();

      console.log(userDataId);
      followerArray.push(userDataId);
      setFollowerUsers(followerArray);
    }); //map
  }, []);

  console.log(followerUsers);

  return (
    <>
      <Link to={"/profile"} state={{ userId: userId }}>
        ⬅︎
      </Link>

      {followerUsers.length > 0 ? (
        <div>
          {followerUsers.map((followerUser: any) => {
            return (
              <Link
                to={followerUser.userId === uid ? "/mypage" : "/profile"}
                state={{ userId: followerUser.userId }}
              >
                <div id={followerUser.userId}>
                  <CommonIcon icon={followerUser.icon} />
                  <div>
                    <p>{followerUser.userName}</p>
                    <p>{followerUser.name}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div>
          <p>フォロワーがいません</p>
        </div>
      )}
    </>
  ); //return
}

export default Follower;
