import { db } from "../../firebase";
import {
  getDoc,
  doc,
  collection,
  CollectionReference,
} from "firebase/firestore";
import { useState } from "react";
import { auth } from "../../firebase";
import { useEffect } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { User } from "../../types/types";
import { DocumentReference } from "firebase/firestore";

export function NGetLoginUserData() {
  //ログイン状態を保持
  //Authenticationに登録されている情報を持つ
  const [authUserData, setAuthUserData] = useState<any>("");

  //取得してきたデータを保持
  const [firestoreUserData, setFirestoreUserData] = useState<User | undefined>(undefined);

  useEffect(() => {
    //ログイン判定
    onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        console.log("ログアウト状態です");
      } else {
        //ログイン情報をuserに代入
        setAuthUserData(currentUser);

        //コレクションへの参照を取得
        const userCollectionRef = collection(
          db,
          "user"
        ) as CollectionReference<User>;

        // //上記を元にドキュメントへの参照を取得
        const userDocRefId: DocumentReference<User> = doc(userCollectionRef, currentUser.uid);

        // //上記を元にドキュメントのデータを取得
        getDoc(userDocRefId).then((userDocId) => {
           // //取得したデータから必要なものを取り出す
        const userDataId: User | undefined = userDocId.data();
        setFirestoreUserData(userDataId);
        })
      }
    });
  }, []);

  return {authUserData, firestoreUserData}
}
