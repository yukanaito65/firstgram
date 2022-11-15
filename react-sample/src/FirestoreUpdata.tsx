import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import React from 'react'
import { db } from './firebase';

const FirestoreUpdata= async(id:string,text:string) =>{
    const postDataCollectionRef = collection(db, "post") ;
    // 上記を元にドキュメントへの参照を取得
    const postDataDocRefId = doc(postDataCollectionRef, id);
    // データ内容更新
    updateDoc(postDataDocRefId, {
        caption:text,
    });
  return (
    {
    text:text
    }
  )
}

export default FirestoreUpdata
