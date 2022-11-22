import { onAuthStateChanged } from "firebase/auth";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FaRegBookmark } from "react-icons/fa";
import { auth, db } from "../../../firebase";
import RemoveKeepButton from "./RemoveKeepButton";

//ログインユーザーのkeepPosts配列に今表示しているpostのpostIdが存在したら保存解除ボタン、存在しなかったら保存するボタン
//ログインユーザーのkeepPosts配列
//今表示しているpostのpostId
//propsでpostIdもらう
function AddKeepButton(props: any) {

  const [loading, setLoading] = useState(true);

  //ログインユーザーの情報
  const [user, setUser] = useState<any>("");

  //ログインユーザーの情報
  const [users, setUsers] = useState<any>([]);

  const [userDocRefId, setUserDocRefId] = useState<any>("");

  const [keepPostDocRefId, setKeepPostDocRefId] = useState<any>("");

  //keepしているpostの情報[{1人目},{2人目}....]
  const [keepPosts, setKeepPosts] = useState<any[]>([]);

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

      //表示されている(ボタンを押された)post情報取得して、keepPostsに格納
      const postCollectionRef = collection(db, "post");

      const keepPostDocRefId = doc(postCollectionRef, props.postId);
      setKeepPostDocRefId(keepPostDocRefId);

      const keepPostDocId: any = await getDoc(keepPostDocRefId);

      const keepPostDataId = keepPostDocId.data();
      setKeepPosts(keepPostDataId);

      console.log(props.postId);
      console.log(userDataId);
      // console.log(userDataId.follow); //undefined
      console.log(keepPostDataId);
    }); //onAuth
  }, []);

  //useEffectの中のコードよりも先に外のコードが処理される→初期表示の時にundefinedになってしまう
  console.log(props.postId);
  console.log(users);
  console.log(users.keepPosts); //undefined
  console.log(keepPosts);

  //ログインユーザーのfollow配列に今表示しているユーザーのuserIdが存在したら、フォロー外すボタン、存在しなかったらフォローするボタン
  const [keepBtn, setKeepBtn] = useState<boolean>(false);


  //ログインユーザーのkeepPosts配列にprops.postIdを追加
  //postのkeeps配列にuser.uidを追加
  const addKeep = async () => {
    await updateDoc(userDocRefId, {
      keepPosts: arrayUnion(props.postId),
    });
    await updateDoc(keepPostDocRefId, {
      keeps: arrayUnion(user.uid),
    });
    console.log("add");
    //削除したらtrueにする
    setKeepBtn(true);
    // setFollowerNum(props.followerNum);
  };

  return (
    <>
      {!loading && (
        <>
          {keepBtn === false ? (
            <button onClick={() =>{
               addKeep()
              //  window.location.reload()
              }
              }>
                <FaRegBookmark />
              </button>
          ) : (
            <RemoveKeepButton postId={props.postId} />
          )}
        </>
      )}
    </>
  );
}

export default AddKeepButton;
