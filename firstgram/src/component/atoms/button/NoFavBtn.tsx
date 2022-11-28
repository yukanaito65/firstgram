import { arrayRemove, collection, doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import AddFavBtn from './AddFavBtn';
import { db } from '../../../firebase';

interface State {
    postId:string,
    userName:string
    // postData:any
}

function NoFavBtn(props:State) {
    const [favbtn,setFavbtn]=useState(true)
    const NoFavorite = (e:any) =>{
        updateDoc(doc(collection(db, "post"), props.postId), {
            favorites:arrayRemove(props.userName),
            });
            setFavbtn(false)
        }
  return (
    <div>
    {favbtn === true ?(
        <button onClick={NoFavorite}>×</button>
    ):(
      <AddFavBtn postId={props.postId} userName={props.userName} />
    )}
        </div>
  )
}

export default NoFavBtn
