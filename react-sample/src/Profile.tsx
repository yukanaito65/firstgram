import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  CollectionReference,
  doc,
  getDoc,
  getDocs,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FollowButton from "./component/atoms/button/FollowButton";
import CommonIcon from "./component/atoms/pictures/CommonIcon";
import Icon from "./component/atoms/pictures/Icon";
import MyPost from "./component/atoms/pictures/MyPost";
import { auth, db } from "./firebase";
import { Post } from "./types/types";

interface State {
  userId: string;
}

function Profile() {
  //取得してきたデータ保管
  const [users, setUsers] = useState<any>([]);
  const [posts, setPosts] = useState<QuerySnapshot[]>([]);

  const [loading, setLoading] = useState(true);

  //userのpost配列
  const [postList, setPostList] = useState<any>({ post: [] });

  //userのfollow配列
  const [followList, setFollowList] = useState<any>({ follow: [] });

  //userのfollower配列
  const [followerList, setFollowerList] = useState<any>({ follower: [] });

  //各ページからデータ取得
  const location = useLocation();
  const { userId } = location.state as State;
  console.log(userId);

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser: any) => {
      setLoading(false);

      const userCollectionRef = collection(db, "user");

      const userDocRefId = doc(userCollectionRef, userId);

      const userDocId = await getDoc(userDocRefId);

      const userDataId = userDocId.data();
      setUsers(userDataId);
      console.log(userDataId);
      if (!userDataId) {
        console.log("データがありません");
      } else {
        setPostList(userDataId.post);
        setFollowList(userDataId.follow);
        setFollowerList(userDataId.follower);
      }

      //投稿一覧取得
      const postCollectionRef: any = query(
        collection(db, "post"),
        where("userId", "==", userId)
      ) as CollectionReference<Post>;

      // 上記を元にドキュメントのデータを取得(post)
      const postDocId: any = await getDocs(postCollectionRef);

      //上記を元にデータの中身を取り出す。map()を使えるようにする。
      const newPostDocIds = postDocId.docs as any[];
      const postDataArray = newPostDocIds.map((id) => id.data());
      setPosts(postDataArray);
    });
  }, []);

  console.log(posts);

  return (
    <>
      {!loading && (
        <div>
          <div>{users.userName}</div>
          <div>
            <CommonIcon icon={users.icon} />
          </div>
          <div>{postList.length}投稿</div>
          <Link to={"/follower"} state={{ userId: userId }}>
            <div>{followerList.length}フォロワー</div>
          </Link>
          <Link to={"/follow"} state={{ userId: userId }}>
            <div>{followList.length}フォロー中</div>
          </Link>
          <div>{users.profile}</div>
          <Link to={`/dmPage`}>
            <button>DM</button>
          </Link>
          <FollowButton />
          <div>
            {postList.length > 0 ? (
              <div>
                {posts.map((post: any) => {
                  return (
                    <Link
                      to="/PostDetails"
                      state={{ userId: users.userId, postId: post.postId }}
                    >
                      <MyPost imageUrl={post.imageUrl} />
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div>
                <p>投稿がありません</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
