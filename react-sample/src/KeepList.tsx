import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs, query, QuerySnapshot, where } from "firebase/firestore";
import { setUseProxies } from "immer";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MyPost from "./component/atoms/pictures/MyPost";
import { auth, db } from "./firebase";

function KeepList() {
  //keepPostsの中に入っているpostIdを元にpostのimageUrl取得
  //LinkのPOstDetailsに渡すstateはpostIdとその投稿のuserId
  //posts
  const [user, setUser] = useState<any>("");

  const [loading, setLoading] = useState(true);

  const [keepList, setKeepList] = useState([]);

  const [keepPosts, setKeepPosts] = useState<QuerySnapshot[]>([]);

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser: any) => {
      setUser(currentUser);
      setLoading(false);

      //ログインユーザーのkeepPosts配列をkeepListに格納
      const userCollectionRef = collection(db, "user");

      const userDocRefId = doc(userCollectionRef, currentUser.uid);

      const userDocId = await getDoc(userDocRefId);

      const userKeepList = userDocId.get("keepPosts");
      setKeepList(userKeepList);



      //この方法だと2回に１回ぐらいひとつしか表示されない
      // const keepArray: any = [];

      // userKeepList.map(async (keepPostId: any) => {
      //   const keepPostCollectionRef = collection(db, "post");

      //   const keepPostsDocRefId = doc(keepPostCollectionRef, keepPostId);

      //   const keepPostDocId = await getDoc(keepPostsDocRefId);

      //   const keepPostDataId = keepPostDocId.data();

      //   keepArray.push(keepPostDataId);
      //   setKeepPosts(keepArray);
      // }); //map

      const postCollectionRef = query(collection(db,"post"),
      where("keeps", "array-contains", currentUser.uid));

      console.log(postCollectionRef);

      const keepPostDocId = await getDocs(postCollectionRef);
      console.log(keepPostDocId.docs);
      console.log(keepPostDocId);

      const newKeepPostDocIds = keepPostDocId.docs as any[];
      const keepPostArray = newKeepPostDocIds.map((doc)=>doc.data());
      setKeepPosts(keepPostArray);
    }); //onAuth
  }, []);
  console.log(keepPosts);
  console.log(user.uid);
  console.log(keepList);

  return (
    <>
      {!loading && (
        <>
          <Link to={"/mypage"}>⬅︎</Link>

          {keepList.length > 0 ? (
            <div>
          {keepPosts.map((keepPost: any) => {
            return (
                <Link
                  to={"/PostDetails"}
                  state={{ userId: keepPost.userId, postId: keepPost.postId }}
                >
                  {/* <MyPost imageUrl={keepPost.imageUrl} /> */}
                  <img src={keepPost.imageUrl} alt="投稿" />
                </Link>
            );
          })}
          </div>
          ) :(
            <div>
              <p>保存済みの投稿はありません</p>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default KeepList;
