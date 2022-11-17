import { onAuthStateChanged } from "firebase/auth";
import { arrayRemove, arrayUnion, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../../firebase";


function FollowButton() {
  //ログインユーザーの情報
  const [users, setUsers] = useState<any>([]);

  const [userDocRefId, setUserDocRefId] = useState<any>("");

  const [followUserDocRefId, setFollowUserDocRefId] = useState<any>("");

  //フォローしているユーザーの情報[{1人目},{2人目}....]
  const [followUsers, setFollowUsers] = useState<any[]>([]);

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser: any) => {
      const userCollectionRef = collection(db, "user");

      const userDocRefId = doc(userCollectionRef, currentUser.uid);
      setUserDocRefId(userDocRefId);

      const userDocId = await getDoc(userDocRefId);

      const userDataId = userDocId.data();
      setUsers(userDataId);

      const followArray: any = [];

      if(!userDataId){
        console.log("データがありません");
      }else{
      userDataId.follow.map(async (userId: any) => {
        const followUserCollectionRef: any = collection(db, "user");


        const followUserDocRefId = doc(followUserCollectionRef, userId);
        setFollowUserDocRefId(followUserDocRefId);

        const followUserDocId: any = await getDoc(followUserDocRefId);

        const followUserDataId = followUserDocId.data();

        followArray.push(followUserDataId);
        setFollowUsers(followArray);

      });
    }
    });
  }, []);

  // const changeFollow = () => {
  // onAuthStateChanged(auth, async (user) => {
  //   if (!user) {
  //   console.log("ログアウト状態です");
  //   } else {
  //   //ログイン済みユーザーのドキュメントへの参照を取得
  //   const userDocumentRef = doc(db, "user", user.uid);
  //   // ドキュメント更新(postId[]を作成、docRef.idを追加)

  //   updateDoc(userDocumentRef, {
  //       follow: userId,
  //   });

  //   // //上記を元にドキュメントのデータを取得
  //   // const userDoc = await getDoc(docRef);

  //   }

  // const changeFollow = async () => {
  //   if (followList.includes(followUserId)) {
  //     //存在すれば、followから削除[フォロー中](外す)
  //     await updateDoc(userDocRefId, {
  //       follow: arrayRemove(followUserId),
  //     });
  //     //ユーザーのfollower配列からログインユーザーを削除
  //     await updateDoc(followUserDocRefId, {
  //       follower: arrayRemove(user.uid),
  //     });
  //   } else {
  //     //存在しなければ、ログインユーザーのfollowに追加[フォローする]
  //     await updateDoc(userDocRefId, {
  //       follow: arrayUnion(followUserId),
  //     });
  //     //ユーザーのfollower配列にログインユーザーを追加
  //     await updateDoc(followUserDocRefId, {
  //       follower: arrayUnion(user.uid),
  //     });
  //   }
  // };

  return (
    <>
    {followUsers.map((followUserData) => {
      return(
    <div>
      <button
        onClick={async () => {
          // updateVisibility();
          // setFollowBtn(false)
          // if(followList.includes(followUser.userId)){
          await updateDoc(userDocRefId, {
            follow: arrayRemove(followUserData.userId),
          });
          //ユーザーのfollower配列からログインユーザーを削除
          await updateDoc(followUserDocRefId, {
            follower: arrayRemove(users.userId),
          });
          console.log("remove/true");
          // }
        }}
      >
        フォロー外す
      </button>
      <button
        onClick={async () => {
          // updateVisibility();
          // setFollowBtn(true);
          // if(!followList.includes(followUser.userId)){
          //存在しなければ、ログインユーザーのfollowに追加[フォローする]
          await updateDoc(userDocRefId, {
            follow: arrayUnion(followUserData.userId),
          });
          //ユーザーのfollower配列にログインユーザーを追加
          await updateDoc(followUserDocRefId, {
            follower: arrayUnion(users.userId),
          });
          console.log("add/false");
          // }
        }}
      >
        フォローする
      </button>
    </div>
      )
    })}
    </>
  );
}

export default FollowButton;
