import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  CollectionReference,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  query,
  QueryDocumentSnapshot,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AddFollowButton from "../atoms/button/AddFollowButton";
// import FollowButton from "./component/atoms/button/FollowButton";
import RemoveFollowButton from "../atoms/button/RemoveFollowButton";
import CommonIcon from "../atoms/icon/CommonIcon";
import UserName from "../atoms/user/UserName";
import { auth, db } from "../../firebase";
import { Post, User } from "../../types/types";
import PostCount from "../atoms/user/PostCount";
import FollowCount from "../atoms/user/FollowCount";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import Name from "../atoms/user/Name";
import ThreeRowsPostList from "../molecules/ThreeRowsPostList";
import ProfileFollowerCount from "../atoms/user/ProfileFollowerCount";

interface State {
  userId: string;
}

function Profile() {
  const [user, setUser] = useState<any>("");

  //ログインユーザーのfollow情報
  const [usersFollow, setUsersFollow] = useState<any>([]);

  //userIdのユーザーの情報
  const [profileUsers, setProfileUsers] = useState<any>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  const [loading, setLoading] = useState(true);

  //userのpost配列
  // const [postList, setPostList] = useState<any>({ post: [] });

  //userのfollow配列
  const [followList, setFollowList] = useState<any>({ follow: [] });

  //userのfollower配列
  // const [followerList, setFollowerList] = useState<any>({ follower: [] });

  // const [followBtn,setFollowBtn] = useState<boolean>();

  // const [followerNum,setFollowerNum] = useState(0);

  // const [userCollectionRef, setUserCollectionRef] = useState<any>("");

  const [followerCount, setFollowerCount] = useState<any>("");

  //各ページからデータ取得
  const location = useLocation();
  const { userId } = location.state as State;
  console.log(userId);

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser: any) => {
      setLoading(false);
      setUser(currentUser);

      const userCollectionRef = collection(
        db,
        "user"
      ) as CollectionReference<User>;
      // setUserCollectionRef(userCollectionRef);

      //ログインユーザーのfollow配列取得(フォローボタン用)
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
        // setFollowerList(profileUserDataId.follower);
        // setFollowerNum(profileUserDataId.follower.length);
      }

      //follower数取得
      //コレクションまるごと取得するから、共通点はそのユーザーをフォロしていること(フォローしている＝フォロワー)
      const followerCollectionRef = query(
        userCollectionRef,
        where("follow", "array-contains", userId)
      );

      const profileUserFollowerCount = await getCountFromServer(
        followerCollectionRef
      );

      setFollowerCount(profileUserFollowerCount.data().count);
      // console.log(profileUserFollowerCount.data().count);

      //投稿一覧取得
      const postCollectionRef: any = query(
        collection(db, "post"),
        where("userId", "==", userId)
      ) as CollectionReference<Post>;

      // 上記を元にドキュメントのデータを取得(post)
      const postDocId = await getDocs(postCollectionRef);

      //上記を元にデータの中身を取り出す。map()を使えるようにする。
      const newPostDocIds = postDocId.docs as QueryDocumentSnapshot<Post>[];
      const postDataArray = newPostDocIds.map((id) => id.data());
      setPosts(postDataArray);
    });
  }, []);

  // console.log(profileUsers); //[]
  // console.log(profileUsers.follow); //undefined
  // console.log(posts); //[]
  // console.log(followList); //follow[]
  // console.log(userId); //id出てる
  // console.log(profileUsers.userId); //undefined
  // console.log(usersFollow);

  // const dispatch = useDispatch();

  // const followerNum = useSelector((state:any)=>state.followerCountSlice.follower);

  return (
    <>
      {!loading && (
        <>
          <Header show={true} />
          <div>
            <div className="profile__userName">
              <UserName users={profileUsers} />
            </div>

            <div className="profile__info">
              <CommonIcon icon={profileUsers.icon} />

              <div className="profile__threeCount">
                <PostCount posts={posts} />

                <ProfileFollowerCount
                  followerCount={followerCount}
                  link={"/follower"}
                  uid={user.uid}
                  userId={userId}
                />

                <FollowCount
                  followList={followList}
                  link={"/follow"}
                  userId={userId}
                  uid={user.uid}
                />
              </div>

              {/* redux↓ */}
              {/* <p>{followerNum.length}aaa</p> */}
            </div>

            <span className="profile__name">
              <Name users={profileUsers} />
            </span>
            <div className="profile__profile">
              {profileUsers.profile}
            </div>

            <div className="profile__btnWrapper">
              {usersFollow.includes(userId) ? (
                <>
                  <RemoveFollowButton
                    userId={userId}
                    followerCount={followerCount}
                    // onClick={()=>setFollowerNum(followerNum)}
                    // followerNum={followerNum}
                    setFollowerCount={setFollowerCount}
                  />
                </>
              ) : (
                <>
                  <AddFollowButton
                    userId={userId}
                    followerCount={followerCount}
                    setFollowerCount={setFollowerCount}
                  />
                </>
              )}

              <Link to={`/dmPage`} state={{ userId: userId }}>
                <button className="btn profile__dmBtn">DM</button>
              </Link>
            </div>

            <ThreeRowsPostList
              posts={posts}
              // users={profileUsers}
              message={<p>投稿がありません</p>}
            />
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default Profile;
