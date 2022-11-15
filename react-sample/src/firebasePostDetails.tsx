import { collection, doc, getDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { db } from './firebase';

const firebasePostDetails = async(id:string) =>{
    const postDataCollectionRef = collection(db, "post") ;
    // 上記を元にドキュメントへの参照を取得
    const postDataDocRefId = doc(postDataCollectionRef, id);
    // 上記を元にドキュメントのデータを取得
    const postDataDocId = await getDoc(postDataDocRefId);
    // 取得したデータから必要なものを取り出す
    const postDataId = postDataDocId.data();
    const  imgurl = postDataId?.imgUrl
    const text = postDataId?.caption
    const favolites = postDataId?.favolites
    const comments = postDataId?.comment

  return (
    {
    Imgurl:imgurl,
    Caption:text,
    Favorites:favolites,
    Comments:comments
    }
 
  )
}

export default firebasePostDetails
