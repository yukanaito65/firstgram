import { onAuthStateChanged } from "firebase/auth";
import { collection, CollectionReference, getDocs, query, QueryDocumentSnapshot, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../organisms/Footer";
import Header from "../organisms/Header";
import UserList from "../organisms/UserList";
import { auth, db } from "../../firebase";
import BackBtn from "../atoms/button/BackBtn";
import { User } from "../../types/types";

interface State {
  userId: string;
  follow: string[];
  uid: string;
}

function Follow() {
  //フォローしているユーザーの情報[{1人目},{2人目}....]
  const [followUsers, setFollowUsers] = useState<User[]>([]);

  const [loading, setLoading] = useState(true);

  //各ページからデータ取得
  const location = useLocation();
  const { userId, uid } = location.state as State;

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser:any) => {
      setLoading(false);

      //共通していることはuserIdのユーザーにフォローされていること
      const followUserCollectionRef = query(
        collection(db, "user"),
        where("follower", "array-contains", userId)
      ) as CollectionReference<User>;

      const followUserDocId = await getDocs(followUserCollectionRef);

      const newFollowUserDocIds = followUserDocId.docs as QueryDocumentSnapshot<User>[];

      const followUserArray = newFollowUserDocIds.map((doc) => doc.data());

      setFollowUsers(followUserArray);

      // }); //map
    });
  }, []);

  return (
    <>
      {!loading && (
        <>
          <Header show={true} />
          <BackBtn />
          <UserList usersData={followUsers} uid={uid} />
          <Footer />
        </>
      )}
    </>
  );
}

export default Follow;
