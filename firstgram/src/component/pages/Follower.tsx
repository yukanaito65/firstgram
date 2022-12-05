import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "../organisms/Footer";
import Header from "../organisms/Header";
import UserList from "../organisms/UserList";
import { auth, db } from "../../firebase";

interface State {
  userId: string;
  follower: string[];
  uid: string;
}

function Follower() {
  const [followerUsers, setFollowerUsers] = useState<any>([]);

  const [loading, setLoading] = useState(true);

  //各ページからデータ取得
  const location = useLocation();
  const { userId, uid } = location.state as State;

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser: any) => {
      setLoading(false);

      const followerUserCollectionRef = query(
        collection(db, "user"),
        where("follow", "array-contains", userId)
      );

      const followerUserDocId = await getDocs(followerUserCollectionRef);

      const newFollowerUserDocIds = followerUserDocId.docs as any[];

      const followerUserArray = newFollowerUserDocIds.map((doc) => doc.data());
      setFollowerUsers(followerUserArray);
    });
  }, []);

  console.log(followerUsers);

  return (
    <>
      {!loading && (
        <>
          <Header show={true} />
          <Link to={"/profile"} state={{ userId: userId }}>
            ⬅︎
          </Link>
          <UserList usersData={followerUsers} uid={uid} />
          <Footer />
        </>
      )}
    </>
  ); //return
}

export default Follower;
