import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  orderBy,
  query,
  limit,
  getDocs,
  getDoc,
  where,
  CollectionReference
} from "firebase/firestore";
import SendDM from "./SendDM";
import { auth } from "../../firebase";
import { getAuth } from "firebase/auth";
import { useLocation } from "react-router-dom";
import { onAuthStateChanged } from "@firebase/auth";
// import type { User } from "./types/types";

function DMPage() {
  const [messages, setMessages] = useState([]);
  const auth = getAuth();
  const currentUser:any = auth.currentUser;
  const currentUserId:string = currentUser?.uid;

  useEffect(() => {
    //ログイン判定
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.log("ログアウト状態です");
      } else {
        //コレクションへの参照を取得
        const userCollectionRef = collection(
          db,
          "messages"
        );

        // 上記を元にドキュメントへの参照を取得
        const docData:any = query(userCollectionRef, where("userId","==", currentUserId));
        console.log(docData)

        // 上記を元にドキュメントのデータを取得
        const userDocId:any = await getDocs(docData);
        console.log(docData)

        // // 取得したデータから必要なものを取り出す
        const userDataId: any = userDocId.data();

        console.log("ログイン状態です");

      }
    });
  }, []);

  return (
    <div>
      <h1>メッセージ</h1>
    <p>{ messages }</p>
      <SendDM />
    </div>
  );
  // }
}

export default DMPage;
