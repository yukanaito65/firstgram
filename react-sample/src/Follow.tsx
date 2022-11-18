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
// import FollowButton from "./component/atoms/button/FollowButton";
import CommonIcon from "./component/atoms/pictures/CommonIcon";
import Icon from "./component/atoms/pictures/Icon";
import { auth, db } from "./firebase";

interface State {
  userId: string;
}

function Follow() {
  // //ログインユーザーの情報
  // const [user, setUser] = useState<any>("");

  const [users, setUsers] = useState<any>([]);

  //ログイン判定待ち
  const [loading, setLoading] = useState(true);

  //ログインユーザーのドキュメント参照の値
  const [userDocRefId, setUserDocRefId] = useState<any>("");

  //followユーザーのドキュメント参照の値
  const [followUserDocRefId, setFollowUserDocRefId] = useState<any>("");

  //ログインユーザーのfollowデータ(配列でuserIdが格納されている)
  const [followList, setFollowList] = useState<any>("");

  //フォローしているユーザーの情報[{1人目},{2人目}....]
  const [followUsers, setFollowUsers] = useState<any[]>([]);

  //followのuserId
  const [followUserId, setFollowUserId] = useState("");

  //各ページからデータ取得
  const location = useLocation();
  const { userId } = location.state as State;
  console.log(userId);

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser: any) => {
      setLoading(false);
      // setUser(currentUser);
      //userコレクション参照
      const userCollectionRef = collection(db, "user");

      //ユーザーのドキュメント参照
      const userDocRefId = doc(userCollectionRef, userId);
      setUserDocRefId(userDocRefId);

      //上記を元にデータ取得
      const userDocId = await getDoc(userDocRefId);
      console.log(userDocId);

      //データの中からfollow配列取得
      const followUserList = userDocId.get("follow");
      console.log(followUserList);
      setFollowList(followUserList);

      const userDataId = userDocId.data();
      setUsers(userDataId);

      const followArray: any = [];

      //follow配列の中のユーザー情報一人ずつ取得する
      followUserList.map(async (followUserId: any) => {
        //userコレクション参照
        const followUserCollectionRef: any = collection(db, "user");
        console.log(followUserCollectionRef);

        //userIdがfollow配列の中のuserIdと等しいドキュメントを参照
        const followUserDocRefId = doc(followUserCollectionRef, followUserId);
        setFollowUserDocRefId(followUserDocRefId);

        //ドキュメント取得
        const followUserDocId: any = await getDoc(followUserDocRefId);

        //データ取得
        const followUserDataId = followUserDocId.data();

        //空の配列にデータを格納
        followArray.push(followUserDataId);
        setFollowUsers(followArray);

        console.log(followUsers);

        setFollowUserId(followUserId);
      }); //map
    }); //onAuth
  }, []);

  // console.log(followUsers);
  // console.log(followUserId);

  return (
    <>
      {!loading && (
        <>
          <Link to={"/profile"}>⬅︎</Link>
          <div>
            {followUsers.map((followUser) => {
              return (
                <Link to="/profile" state={{ userId: followUser.userId }}>
                  <div id={followUser.userId}>
                    <CommonIcon icon={followUser.icon} />
                    <div>
                      <p>{followUser.userName}</p>
                      <p>{followUser.name}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}

export default Follow;
