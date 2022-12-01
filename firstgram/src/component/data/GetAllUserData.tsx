import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { getDoc, doc, collection, query, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { db } from "../../firebase";
import Header from "../molecules/Header";
import Footer from "../molecules/Footer";
import { Link } from "react-router-dom";
import CommonIcon from "../atoms/icon/CommonIcon";
import { NGetLoginUserData } from "../data/NGetLoginUserData";
import { DocumentData } from "firebase/firestore";

export function GetAllUserData() {

    const allUserDataArr: DocumentData[] = []

  const auth = getAuth();
  // まずuseEffect内で前userデータのuserNameとnameとtonametouserIdを取得
  useEffect(() => {
    //ログイン判定
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.log("ログアウト状態です");
      } else {
        const userQuery = query(collection(db, "user"));

        getDocs(userQuery).then((data) => {
            console.log(data);
          data.forEach((docdata) => {
            const data = docdata.data();
            allUserDataArr.push(data);
          });
        });
        console.log("ログイン状態です")
      }
    });
  }, []);

  console.log(allUserDataArr)

  return allUserDataArr;
}
