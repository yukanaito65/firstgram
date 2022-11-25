import { collection, doc, getDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { db } from './firebase';

const firebasePostDetails = async(postid:string,userid:string) =>{
    const postDataCollectionRef = collection(db, "post") ;
    // 上記を元にドキュメントへの参照を取得
    const postDataDocRefId = doc(postDataCollectionRef, postid);
    // 上記を元にドキュメントのデータを取得
    const postDataDocId = await getDoc(postDataDocRefId);
    // 取得したデータから必要なものを取り出す
    const postDataId = postDataDocId.data();
    const  imgurl = postDataId?.imageUrl
    const text = postDataId?.caption
    const favolites = postDataId?.favorites
    const comments = postDataId?.comments
    const time = postDataId?.postDate

    // 投稿者のuser情報取得
const postUserDocRef = doc(collection(db,"user"),userid)
// 上記を元にドキュメントのデータを取得
const postUserDoc = await getDoc(postUserDocRef)
// 取得したデータから必要なものを取り出す
const postUserData = postUserDoc.data();
// 投稿者のpostを取り出す
const postUserName = postUserData?.userName
const icon = postUserData?.icon

  return (
    {
    Imgurl:imgurl,
    Caption:text,
    Favorites:favolites,
    Comments:comments,
    Time:time,
    PostUserName:postUserName,
    Icon:icon,
    }

  )
}

export default firebasePostDetails
