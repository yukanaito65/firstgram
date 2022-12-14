import { arrayUnion, collection, doc, updateDoc } from 'firebase/firestore';
import React from 'react'
import { db } from '../../firebase';

function FavoriteUpdata(postid:string,loginUserName:string,a:any) {
    const postDataDocRefId = doc(collection(db, "post"), postid);
    updateDoc(postDataDocRefId, {
          favorites:a(loginUserName),
    });
  return (
    {}
  )
}

export default FavoriteUpdata
