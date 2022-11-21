import { onAuthStateChanged } from "firebase/auth";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../../firebase";

function FollowButton(props: any) {

  const [loading, setLoading] = useState(true);

  //ログインユーザーの情報
  const [user, setUser] = useState<any>("");

  //ログインユーザーの情報
  const [users, setUsers] = useState<any>([]);

  const [userDocRefId, setUserDocRefId] = useState<any>("");

  const [followUserDocRefId, setFollowUserDocRefId] = useState<any>("");

  //フォローしているユーザーの情報[{1人目},{2人目}....]
  const [followUsers, setFollowUsers] = useState<any[]>([]);



  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser: any) => {
      setUser(currentUser);
      setLoading(false);

      //ログインユーザーの情報取得して、usersに格納
      const userCollectionRef = collection(db, "user");

      const userDocRefId = doc(userCollectionRef, currentUser.uid);
      setUserDocRefId(userDocRefId);

      const userDocId = await getDoc(userDocRefId);

      const userDataId = userDocId.data();
      setUsers(userDataId);

      //表示されている(ボタンを押された)ユーザー情報取得して、followUsersに格納
      const followUserDocRefId = doc(userCollectionRef, props.userId);
      setFollowUserDocRefId(followUserDocRefId);

      const followUserDocId: any = await getDoc(followUserDocRefId);

      const followUserDataId = followUserDocId.data();
      setFollowUsers(followUserDataId);

      console.log(props.userId);
      console.log(userDataId);
      // console.log(userDataId.follow); //undefined
      console.log(followUserDataId);
    }); //onAuth
  }, []);

  //useEffectの中のコードよりも先に外のコードが処理される→初期表示の時にundefinedになってしまう
  console.log(props.userId);
console.log(users);
console.log(users.follow); //undefined
console.log(followUsers);

  //ログインユーザーのfollow配列に今表示しているユーザーのuserIdが存在したら、フォロー外すボタン、存在しなかったらフォローするボタン
  const [followBtn, setFollowBtn] = useState(true);

  // const changeFollow = async () => {
  //   if (users.follow.includes(props.userId)) {
  //     setFollowBtn(true);
  //     //存在すれば、followから削除[フォロー中](外す)
  //     await updateDoc(userDocRefId, {
  //       follow: arrayRemove(props.userId),
  //     });
  //     //ユーザーのfollower配列からログインユーザーを削除
  //     await updateDoc(followUserDocRefId, {
  //       follower: arrayRemove(user.uid),
  //     });
  //   } else {
  //     setFollowBtn(false);
  //     //存在しなければ、ログインユーザーのfollowに追加[フォローする]
  //     await updateDoc(userDocRefId, {
  //       follow: arrayUnion(props.userId),
  //     });
  //     //ユーザーのfollower配列にログインユーザーを追加
  //     await updateDoc(followUserDocRefId, {
  //       follower: arrayUnion(user.uid),
  //     });
  //   }
  // };




  const removeFollow = async () => {
    await updateDoc(userDocRefId, {
      follow: arrayRemove(props.userId),
    });
    //ユーザーのfollower配列からログインユーザーを削除
    await updateDoc(followUserDocRefId, {
      follower: arrayRemove(user.uid),
    });
    console.log("remove");
    //削除したらtrueにする
    // setFollowBtn(false);
  };

  const addFollow = async () => {
    await updateDoc(userDocRefId, {
      follow: arrayUnion(props.userId),
    });
    //ユーザーのfollower配列にログインユーザーを追加
    await updateDoc(followUserDocRefId, {
      follower: arrayUnion(user.uid),
    });
    console.log("add");
    // setFollowBtn(true);
  };

const changeFollow = () => {
  if(users.follow.includes(props.userId)){
    //存在したら
    removeFollow();
    setFollowBtn(false);
  }else{
    //存在しなかったら
    // setFollowBtn(false);
    addFollow();
    setFollowBtn(true);
  }
}

  return (
    <>
    {!loading && (
        <button onClick={()=>changeFollow()}>
        </button>
        )}
        </>
      );
  //     {/* <button onClick={() => addFollow()}>フォローする</button> */}
  //     {/* <button onClick={() => removeFollow()}>フォロー中</button> */}
  //   {/* リロードすると機能反転して使える */}

  // }
  //       {/* followBtn ? だとリロードされる度に初期値のtrueに戻ってしまう */}
  //       {/* {users.follow.includes(props.userId) ? "フォロー中" : "フォローする"} */}
  //     {/* </button> */}
  //     {/* <button onClick={()=>handleClick()}></button> */}
  //     {/* {followBtn === true ? (
  //       <button onClick={()=>addFollow()}>フォローする</button>
  //     ):(
  //       <button onClick={()=>removeFollow()}>フォロー中</button>
  //     )} */}
}

export default FollowButton;
