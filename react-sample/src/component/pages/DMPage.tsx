import React, { useState } from 'react'
import {
  getAuth,
  updatePassword as firebaseUpdatePassword,
} from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy
} from "firebase/firestore";
import { db } from '../../firebase';
import { useEffect } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import SendDM from '../pages/SendDM';

function DMTestPage() {
    const [anotherMesseValue, setAnotherMesseValue] = useState<{ message: string; timestamp: Date; }[]>()
    const [ownMesseDisplay, setOwnMesseDisplay] = useState<{ message: string; timestamp: Date; }[]>()

        const auth = getAuth()
    useEffect(() => {
        //ログイン判定
        onAuthStateChanged(auth, async (user) => {
          if (!user) {
            console.log("ログアウト状態です");
          } else {
            const currentUserId = user.uid
    const ownQ = query(
        collection(db, "messages"),
        where("userId", "==", currentUserId),
        orderBy("timestamp")
      );
      const ownQSnapshot = await getDocs(ownQ)
    //   const newPostDocIds = querySnapshot.docs as any[];
     const ownMesseList:{message:string,timestamp:Date}[] = []
      console.log(ownQSnapshot);
      ownQSnapshot.forEach((docdata) => {
        const data = (docdata.id, " => ", docdata.data());
        ownMesseList.push({message:data.message,timestamp:data.timestamp})
      });
      setOwnMesseDisplay(ownMesseList)
      const ownMessageList = ownMesseDisplay
      console.log(ownMesseList)
      console.log(ownMessageList)
//上記を元にデータの中身を取り出す。map()を使えるようにする。
// const postDataArray:any[] = newPostDocIds.map((docdata)=>docdata.data());
// setOwnMesseDisplay(postDataArray);
const anotherQ = query(
    collection(db, "messages"),
    where("userId", "==", "I7k4PTZhlMOOFsGjy67kjYQ5Y4u1"),
    orderBy("timestamp")
  );


}
});
}, []);
    // var timestamp = 1607110465663
    // var date = new Date(timestamp);
    // console.log(date.getTime())

  return (
    <>
         {/* {anotherMesseValue.map((messe) => {
             return <p>{messe}</p>
         })} */}

        {/* {ownMesseDisplay!.map((messe) => {
            return (
                <>
            <p>{messe.message}</p>
            <p>{String(messe.timestamp)}</p>
            </>
            )
        })} */}
    <SendDM />
     </>
  )
}

export default DMTestPage
