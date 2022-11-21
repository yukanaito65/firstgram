import { AnyListenerPredicate, current } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { onAuthStateChanged } from "firebase/auth";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { serialize } from "v8";
import FollowButton from "./component/atoms/button/FollowButton";
// import FollowButton from "./component/atoms/button/FollowButton";
import CommonIcon from "./component/atoms/pictures/CommonIcon";
import Icon from "./component/atoms/pictures/Icon";
import { auth, db } from "./firebase";

interface State {
  userId: string;
  follow: string[];
  uid: string;
}

function Follow() {
  //フォローしているユーザーの情報[{1人目},{2人目}....]
  const [followUsers, setFollowUsers] = useState<any[]>([]);

  //各ページからデータ取得
  const location = useLocation();
  const { userId, follow, uid } = location.state as State;

  useEffect(() => {
    const followArray: any = [];

    //follow配列の中のユーザー情報一人ずつ取得する
    follow.map(async (followUserId: any) => {
      //userコレクション参照
      const followUserCollectionRef: any = collection(db, "user");

      //userIdがfollow配列の中のuserIdと等しいドキュメントを参照
      const followUserDocRefId = doc(followUserCollectionRef, followUserId);

      //ドキュメント取得
      const followUserDocId: any = await getDoc(followUserDocRefId);

      //データ取得
      const followUserDataId = followUserDocId.data();

      //空の配列にデータを格納
      followArray.push(followUserDataId);
      setFollowUsers(followArray);
    }); //map
  }, []);

  return (
    <>
      <Link to={"/profile"} state={{ userId: userId }}>
        ⬅︎
      </Link>

      {followUsers.length > 0 ? (
        <div>
          {followUsers.map((followUser) => {
            return (
              <Link
                to={followUser.userId === uid ? "/mypage" : "/profile"}
                state={{ userId: followUser.userId }}
              >
                <div id={followUser.userId}>
                  <CommonIcon icon={followUser.icon} />
                  <div>
                    <p>{followUser.userName}</p>
                    <p>{followUser.name}</p>
                  </div>
                  {/* <FollowButton userId={followUser.userId} /> */}
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div>
          <p>フォローしているユーザーがいません</p>
        </div>
      )}
    </>
  );
}

export default Follow;
