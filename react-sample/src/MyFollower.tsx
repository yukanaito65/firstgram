import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./component/molecules/Footer";
import Header from "./component/molecules/Header";
import UserList from "./component/pages/UserList";
import { auth, db } from "./firebase";

function MyFollower() {
  //ログインユーザーの情報
  const [user, setUser] = useState<any>("");

  //ログイン判定待ち
  const [loading, setLoading] = useState(true);

  //ログインユーザーのドキュメント取得
  // const [userDocRefId, setUserDocRefId] = useState<any>("");

  //followerユーザーのドキュメント参照の値
  // const [followerUserDocRefId, setFollowerUserDocRefId] = useState<any>("");

  //ログインユーザーのfollowerデータ(配列でuserIdが格納されている)
  // const [followerList, setFollowerList] = useState<any>("");

  //フォローされているユーザーの情報[{1人目},{2人目}....]
  const [followerUsers, setFollowerUsers] = useState<any[]>([]);

  //followのuserId
  // const [followerUserId, setFollowerUserId] = useState("");

  useEffect((): any => {
    onAuthStateChanged(auth, async (currentUser: any) => {
      setLoading(false);
      setUser(currentUser);

      //userコレクション参照
      // const userCollectionRef = collection(db, "user");

      // //ログインユーザーのドキュメント参照
      // const userDocRefId = doc(userCollectionRef, currentUser.uid);
      // // setUserDocRefId(userDocRefId);

      // //上記を元にデータ取得
      // const userDocId = await getDoc(userDocRefId);
      // console.log(userDocId); //il

      // //データの中からfollow配列取得
      // const followerUserList = userDocId.get("follower");
      // console.log(followerUserList);
      // setFollowerList(followerUserList);

      //複数のユーザーの情報を取得する＝共通していることは、ログインユーザーのことをフォローしていること
      const followerUserCollectionRef = query(
        collection(db, "user"),
        where("follow", "array-contains", currentUser.uid)
      );

      const followerUserDocId = await getDocs(followerUserCollectionRef);

      const newFollowerUserDocIds = followerUserDocId.docs as any[];

      const followerUserArray = newFollowerUserDocIds.map((doc) => doc.data());
      setFollowerUsers(followerUserArray);
    }); //onAuth
  }, []); //useEffect

  console.log(followerUsers);
  // console.log(followerList);

  return (
    <>
      {!loading && (
        <>
        <Header />
          <Link to={"/mypage"}>⬅︎</Link>
          <UserList
          usersData={followerUsers}
          uid={user.uid} />
        <Footer />
        </>
      )}
    </>
  );
}

export default MyFollower;
