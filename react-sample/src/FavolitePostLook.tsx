import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { auth, db } from './firebase';


const  FavolitePostLook=async()=> {
const[favolite,setFavolite]=useState([])
interface State {
        id:string
    }

const location = useLocation();
const {id} = location.state as State

onAuthStateChanged(auth, async (user) => {
    if (!user) {
    console.log("ログアウト状態です");
    } else {
const docusesinformation = doc(db, "user", user.uid);
const userDataDoc =  await getDoc(docusesinformation);
const userDatas = userDataDoc.data();
const username =  userDatas?.userName

const postDataDocRef = doc(collection(db, "post"), id);
updateDoc(postDataDocRef, {
      favolites:username,
  });

const postdataDoc =await (await getDoc(postDataDocRef)).data()?.favolites
setFavolite(postdataDoc)
}})

  return (
    {favo:favolite}
  )
}

export default FavolitePostLook
