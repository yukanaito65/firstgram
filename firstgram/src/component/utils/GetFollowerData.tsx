import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";

function GetFollowerData() {

  //ログインユーザーの情報
  const [user, setUser] = useState<any>("");

  //ログイン判定待ち
  const [loading, setLoading] = useState(true);

  //フォローされているユーザーの情報[{1人目},{2人目}....]
  const [followerUsers, setFollowerUsers] = useState<any[]>([]);


  useEffect((): any => {
    onAuthStateChanged(auth, async (currentUser: any) => {
      setLoading(false);
      setUser(currentUser);

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


  return (
  {
    user,
    loading,
    followerUsers
  }
  );
}

export default GetFollowerData;
