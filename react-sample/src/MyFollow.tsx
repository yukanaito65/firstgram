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
// import { render } from "react-dom";
import { Link } from "react-router-dom";
import { serialize } from "v8";
import FollowButton from "./component/atoms/button/FollowButton";
// import FollowButton from "./component/atoms/button/FollowButton";
import CommonIcon from "./component/atoms/pictures/CommonIcon";
import Icon from "./component/atoms/pictures/Icon";
import { auth, db } from "./firebase";

function MyFollow() {
  //ログインユーザーの情報
  const [user, setUser] = useState<any>("");

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

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser: any) => {
      setLoading(false);
      setUser(currentUser);
      //userコレクション参照
      const userCollectionRef = collection(db, "user");

      //ログインユーザーのドキュメント参照
      const userDocRefId = doc(userCollectionRef, currentUser.uid);
      setUserDocRefId(userDocRefId);

      //上記を元にデータ取得
      const userDocId = await getDoc(userDocRefId);
      console.log(userDocId);

      //データの中からfollow配列取得
      const followUserList = userDocId.get("follow");
      console.log(followUserList); //配列で2つ取得できてる
      setFollowList(followUserList);

      const userDataId = userDocId.data();
      setUsers(userDataId);

      const followArray: any = [];

      //follow配列の中のユーザー情報一人ずつ取得する
      followUserList.map(async (userId: any) => {
        //userコレクション参照
        const followUserCollectionRef: any = collection(db, "user");
        console.log(followUserCollectionRef);

        //userIdがfollow配列の中のuserIdと等しいドキュメントを参照
        const followUserDocRefId = doc(followUserCollectionRef, userId);
        setFollowUserDocRefId(followUserDocRefId);

        //ドキュメント取得
        const followUserDocId: any = await getDoc(followUserDocRefId);

        //データ取得
        const followUserDataId = followUserDocId.data();

        //空の配列にデータを格納
        followArray.push(followUserDataId);
        setFollowUsers(followArray);

        console.log(followUsers);

        setFollowUserId(userId);
      }); //map
    }); //onAuth
  }, []);

  const [followBtn, setFollowBtn] = useState<any>(true);

  const [isVisible, setVisibility] = useState(true);

  // isVisibleを反転する関数を定義する。
  const updateVisibility = () => {
    setVisibility(!isVisible);
    // render();
  };

  // const removeFollow = async() => {
  //   setFollowBtn(true);
  //   await updateDoc(userDocRefId, {
  //     follow: arrayRemove(followUserId),
  //   });
  //   //ユーザーのfollower配列からログインユーザーを削除
  //   await updateDoc(followUserDocRefId, {
  //     follower: arrayRemove(user.uid),
  //   });
  //   console.log("remove/true");
  // }

  // const addFollow = async()=>{
  //   setFollowBtn(false);
  //   //存在しなければ、ログインユーザーのfollowに追加[フォローする]
  //   await updateDoc(userDocRefId, {
  //     follow: arrayUnion(followUserId),
  //   });
  //   //ユーザーのfollower配列にログインユーザーを追加
  //   await updateDoc(followUserDocRefId, {
  //     follower: arrayUnion(user.uid),
  //   });
  //   console.log("add/false");
  // }

  //フォローボタン  削除が機能していることは確認済み
  // const changeFollow = async () => {
  //   if (followList.includes(followUserId)) {
  //     //存在すれば、followから削除[フォロー中](外す)
  //     await updateDoc(userDocRefId, {
  //       follow: arrayRemove(followUserId),
  //     });
  //     //ユーザーのfollower配列からログインユーザーを削除
  //     await updateDoc(followUserDocRefId, {
  //       follower: arrayRemove(user.uid),
  //     });
  //     setFollowBtn(true);
  //     console.log(true);
  //   } else {
  //     //存在しなければ、ログインユーザーのfollowに追加[フォローする]
  //     await updateDoc(userDocRefId, {
  //       follow: arrayUnion(followUserId),
  //     });
  //     //ユーザーのfollower配列にログインユーザーを追加
  //     await updateDoc(followUserDocRefId, {
  //       follower: arrayUnion(user.uid),
  //     });
  //     setFollowBtn(false);
  //     console.log(false);
  //   }
  // };

  console.log(followUsers);
  console.log(followUserId);

  return (
    <>
      {!loading && (
        <>
          <Link to={"/mypage"}>⬅︎</Link>

          {followUsers.length > 0 ? (
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
                      <FollowButton userId={followUser.userId} />
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div>
              <p>フォローしている人がいません</p>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default MyFollow;
