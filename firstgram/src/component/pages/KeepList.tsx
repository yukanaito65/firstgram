import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../molecules/Footer";
import Header from "../molecules/Header";
import { auth, db } from "../../firebase";
import ThreeRowsPostList from "../molecules/ThreeRowsPostList";

function KeepList() {
  //keepPostsの中に入っているpostIdを元にpostのimageUrl取得
  //LinkのPostDetailsに渡すstateはpostIdとその投稿のuserId
  //posts

  //ログインユーザー
  const [user, setUser] = useState<any>("");

  const [loading, setLoading] = useState(true);

  //ログインユーザーの情報の中からkeepPostsを格納
  const [keepPostIds, setKeepPostIds] = useState([]);

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
      setKeepPostIds(userKeepList);

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

      const postCollectionRef = query(
        collection(db, "post"),
        where("keeps", "array-contains", currentUser.uid)
      );

      console.log(postCollectionRef);

      const keepPostDocId = await getDocs(postCollectionRef);
      console.log(keepPostDocId.docs);
      console.log(keepPostDocId);

      const newKeepPostDocIds = keepPostDocId.docs as any[];
      const keepPostArray = newKeepPostDocIds.map((doc) => doc.data());
      setKeepPosts(keepPostArray);
    }); //onAuth
  }, []);
  console.log(keepPosts); //postの情報がオブジェクトになって配列に格納
  console.log(user.uid);
  console.log(keepPostIds); //postIdだけ配列に格納

  return (
    <>
      {!loading && (
        <>
          <Header show={true} />
          <Link to={"/mypage"}>⬅︎</Link>
          <ThreeRowsPostList
            posts={keepPosts}
            message={<p>保存済みの投稿はありません</p>}
          />
          {/* {keepPostIds.length > 0 ? (
            <div>
          {keepPosts.map((keepPost: any) => {
            return (
                <Link
                  to={"/PostDetails"}
                  state={{ userid: keepPost.userId, postid: keepPost.postId }}
                >
                  <MyPost imageUrl={keepPost.imageUrl} />
                </Link>
            );
          })}
          </div>
          ) :(
            <div>
              <p>保存済みの投稿はありません</p>
            </div>
          )} */}
          <Footer />
        </>
      )}
    </>
  );
}

export default KeepList;
