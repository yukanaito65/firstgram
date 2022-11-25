import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import Footer from "./component/molecules/Footer";
import Header from "./component/molecules/Header";
import UserList from "./component/pages/UserList";
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
    <Header />
      <Link to={"/profile"} state={{ userId: userId }}>
        ⬅︎
      </Link>
      <UserList
      usersData={followerUsers}
      uid={uid}
      />
      <Footer />
    </>
  ); //return
}

export default Follower;
