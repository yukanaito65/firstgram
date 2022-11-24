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
import AddFollowButton from "./component/atoms/button/AddFollowButton";
// import FollowButton from "./component/atoms/button/FollowButton";
import RemoveFollowButton from "./component/atoms/button/RemoveFollowButton";
import FollowerCount from "./component/atoms/user/FollowerCount";
import CommonIcon from "./component/atoms/pictures/CommonIcon";
import Icon from "./component/atoms/pictures/Icon";
import MyPost from "./component/atoms/pictures/MyPost";
import UserName from "./component/atoms/user/UserName";
import MyPostList from "./component/molecules/MyPostList";
import { auth, db } from "./firebase";
import { Post } from "./types/types";
import PostCount from "./component/atoms/user/PostCount";
import FollowCount from "./component/atoms/user/FollowCount";

interface State {
  userId: string;
}

function Profile() {

  const [user, setUser] = useState<any>("");

  //ログインユーザーのfollow情報
  const [usersFollow, setUsersFollow] = useState<any>([]);

  //userIdのユーザーの情報
  const [profileUsers, setProfileUsers] = useState<any>([]);
  const [posts, setPosts] = useState<QuerySnapshot[]>([]);

  const [loading, setLoading] = useState(true);

  //userのpost配列
  // const [postList, setPostList] = useState<any>({ post: [] });

  //userのfollow配列
  const [followList, setFollowList] = useState<any>({ follow: [] });

  //userのfollower配列
  const [followerList, setFollowerList] = useState<any>({ follower: [] });

  // const [followBtn,setFollowBtn] = useState<boolean>();

  const [followerNum,setFollowerNum] = useState(0);

  //各ページからデータ取得
  const location = useLocation();
  const { userId } = location.state as State;
  console.log(userId);

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser: any) => {
      setLoading(false);
      setUser(currentUser);

      const userCollectionRef = collection(db, "user");

      //ログインユーザーのfollow配列取得
      const userDocRefId = doc(userCollectionRef, currentUser.uid);

      const userDocId = await getDoc(userDocRefId);

      const userDataFollow = userDocId.get("follow");
      setUsersFollow(userDataFollow);

      //前のページから渡されたuserIdを元にデータ取得し、usersに格納
      const profileUserDocRefId = doc(userCollectionRef, userId);

      const profileUserDocId = await getDoc(profileUserDocRefId);

      const profileUserDataId = profileUserDocId.data();
      setProfileUsers(profileUserDataId);
      console.log(profileUserDataId);

      if (!profileUserDataId) {
        console.log("データがありません");
      } else {
        // setPostList(profileUserDataId.post);
        setFollowList(profileUserDataId.follow);
        setFollowerList(profileUserDataId.follower);
        setFollowerNum(profileUserDataId.follower.length);
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

  console.log(profileUsers); //[]
  console.log(profileUsers.follow); //undefined
  console.log(posts); //[]
  console.log(followList);//follow[]
  console.log(userId); //id出てる
  console.log(profileUsers.userId); //undefined
  console.log(usersFollow);


  return (
    <>
      {!loading && (
        <div>
          <UserName users={profileUsers} />
          <div>
            <CommonIcon icon={profileUsers.icon} />
          </div>
          <PostCount posts={posts}/>
          {/* <Link to={"/follower"} state={{ userId: userId, follower:followerList, uid: user.uid }}>
            <div>{followerNum}follower</div>
          </Link> */}
{/*
          <FollowerCount
          followerList={followerList}
          link={"/follower"}

          <FollowCount
          followList={followList}
          link={"/follow"}
          userId={userId}
          uid={user.uid}
          />
          {/* <Link to={"/follow"} state={{ userId: userId, follow:followList, uid: user.uid }}>
            <div>{followList.length}フォロー中</div>
          </Link> */}

          <div>{profileUsers.profile}</div>
          <Link to={`/dmPage`}>
            <button>DM</button>
          </Link>
          <Link to={"/mypage"}>マイページ</Link>
           {usersFollow.includes(userId) ? (
            <>
            <RemoveFollowButton
            userId={userId}
            // onClick={()=>setFollowerNum(followerNum)}
            // followerNum={followerNum}
            />
            </>
           ) : (
            <>
            <AddFollowButton userId={userId} />
            </>
           )}
           <MyPostList
           posts={posts}
           users={profileUsers}
           />
        </div>
      )}
    </>
  );
}

export default Profile;
