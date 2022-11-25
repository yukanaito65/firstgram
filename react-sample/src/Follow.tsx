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
import Footer from "./component/molecules/Footer";
import Header from "./component/molecules/Header";
import UserList from "./component/pages/UserList";
import { db } from "./firebase";

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
      const followUserCollectionRef = collection(db, "user");

      //userIdがfollow配列の中のuserIdと等しいドキュメントを参照
      const followUserDocRefId = doc(followUserCollectionRef, followUserId);

      //ドキュメント取得
      const followUserDocId = await getDoc(followUserDocRefId);

      //データ取得
      const followUserDataId = followUserDocId.data();

      //空の配列にデータを格納
      followArray.push(followUserDataId);
      setFollowUsers(followArray);
    }); //map
  }, []);

  return (
    <>
    <Header show={true} />
      <Link to={"/profile"} state={{ userId: userId }}>
        ⬅︎
      </Link>
      <UserList
      usersData={followUsers}
      uid={uid} />
      <Footer />
    </>
  );
}

export default Follow;
