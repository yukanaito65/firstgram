import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

const GetLoginUserData =async(user:any) =>{
    // onAuthStateChanged(auth, async (user) => {
        // ログインしているユーザーのuserNameをuseStateで保持
        const userDatas = doc(collection(db, "user"), user?.uid);
        const  userDataGet = await getDoc(userDatas);
        const userData = userDataGet.data();
        const userName =userData?.userName
        const keepPosts = userData?.keepPosts;
         // ログインしているユーザーのフォローしている人のuseridを配列に格納
        const follow =  userData?.follow
        const post = userData?.post
  return (
    {
    userName:userName,
    keepPosts:keepPosts,
    follow:follow,
    post:post
    }
  )
}

export default GetLoginUserData
