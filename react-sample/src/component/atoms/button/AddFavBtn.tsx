import { arrayUnion, collection, doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { db } from '../../../firebase';
import NoFavBtn from './NoFavBtn';

interface State {
    postId:string,
    userName:string
    // postData:any
}

const AddFavBtn = (props:State) => {
    // const postData2=[...props.postData]
    // for(let i = 0; i<postData2.length; i++){
    //     console.log(props.postId)
    //     if(postData2[i].postId === props.postId){
    //         postData2[i].favorites.push()
    //     }
    // }
    const [favbtn,setFavbtn]=useState(false)

    const Favorite = (e:any) =>{
    updateDoc(doc(collection(db, "post"), props.postId), {
        favorites:arrayUnion(props.userName),
        });
    setFavbtn(true)
    // setPostData(()=>postData2)
    }
  return (
    <div>
{favbtn === false ?(
<button onClick={Favorite}>♡</button>
):(
  <NoFavBtn postId={props.postId} userName={props.userName} />
)}
    </div>
  )
}

export default AddFavBtn
