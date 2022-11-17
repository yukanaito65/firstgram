import { collection, doc, getDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { db } from './firebase';

const firebasePostDetails = async(id:string,userid:string) =>{
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
    const comment = postDataId?.comment
    const time = postDataId?.postData

    // 投稿者のuser情報取得
const postUserDocRef = doc(collection(db,"user"),userid)
// 上記を元にドキュメントのデータを取得
const postUserDoc = await getDoc(postUserDocRef)
// 取得したデータから必要なものを取り出す
const postUserData = postUserDoc.data();
// 投稿者のpostを取り出す
const postUserName = postUserData?.userName
const icon = postUserData?.icon



    const postDataDocRef = doc(collection(db, "post"), id);
    // updateDoc(postDataDocRef, {
    //   favolites:userName,
    // });
    // const postdataDoc =await (await getDoc(postDataDocRef)).data()?.favolites
    // setFavolite(postdataDoc)

  return (
    {
    Imgurl:imgurl,
    Caption:text,
    Favorites:favolites,
    Comment:comment,
    Time:time,
    PostUserName:postUserName,
    Icon:icon,
    favo:postDataDocRefId
    }
 
  )
}

export default firebasePostDetails
