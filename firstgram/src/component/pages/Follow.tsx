import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "../molecules/Footer";
import Header from "../molecules/Header";
import UserList from "../organisms/UserList";
import { auth, db } from "../../firebase";

interface State {
  userId: string;
  follow: string[];
  uid: string;
}

function Follow() {
  //フォローしているユーザーの情報[{1人目},{2人目}....]
  const [followUsers, setFollowUsers] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  //各ページからデータ取得
  const location = useLocation();
  const { userId, uid } = location.state as State;

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser: any) => {
      setLoading(false);

      //共通していることはuserIdのユーザーにフォローされていること
      const followUserCollectionRef = query(
        collection(db, "user"),
        where("follower", "array-contains", userId)
      );

      const followUserDocId = await getDocs(followUserCollectionRef);

      const newFollowUserDocIds = followUserDocId.docs as any[];

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
          <Link to={"/profile"} state={{ userId: userId }}>
            ⬅︎
          </Link>
          <UserList usersData={followUsers} uid={uid} />
          <Footer />
        </>
      )}
    </>
  );
}

export default Follow;
