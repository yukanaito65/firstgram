import { onAuthStateChanged } from 'firebase/auth';


import { collection, doc, getDoc, getDocs, query, updateDoc, where ,serverTimestamp, arrayUnion, arrayRemove} from 'firebase/firestore';
import { connectStorageEmulator } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { Link, useActionData, useLocation, useRouteLoaderData } from 'react-router-dom';
import AddKeepButton from '../atoms/button/AddKeepButton';
import RemoveKeepButton from '../atoms/button/RemoveKeepButton';

import AddFavBtn from '../atoms/button/AddFavBtn';
import { auth, db } from '../../firebase';
import NoFavBtn from '../atoms/button/NoFavBtn';
import Footer from "../molecules/Footer";
import Header from "../molecules/Header";
import GetLoginUserName from '../utils/GetLoginUserData';
import { AiFillHeart, AiOutlineClose, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';

function PostLook() {
    // followuserのpostidからとってきたpostData
    const [postData, setPostData] = useState<any>([]);
    // followuserのpostidからとってきたpostData
    const [ramData, setRamData] = useState<any>([]);
    // postid保持
    const[postId,setPostId]=useState<any>("");
    // inputcommentを格納
    const [inputComment, setInputComment] = useState<any>("");
    // ログインしているユーザーのuserNameを格納
    const [loginUserName, setLoginUserName] = useState<any>("");


    // ログインしているユーザーのfollowしている人のIdの配列
    const [followUser, setFollowUser] = useState<any>([]);

    // ログインしているユーザーのpostの配列
    const [myPostId, setMyPostID] = useState<any>([]);

    const [loginUserKeep, setLoginUserKeep] = useState<any>("");

    //
    const [postDataSecond,  setPostDataSecond] = useState<any>({});

    const [favbtn,setFavbtn]=useState(1)
// コメントの表示非表示
const[commentDisplay, setCommentDisplay] = useState<boolean>(false)
    
    useEffect(()=>{
    onAuthStateChanged(auth, async (user) => {
    // ログインしているユーザーのuserNameをuseStateで保持
    GetLoginUserName(user).then((loginUserData:any)=>{
            setLoginUserName(loginUserData.userName);
    })

        if (!user) {
        console.log("ログアウト状態です");
        } else {


        // ログインしているユーザーのデータ取得
        // GetLoginUserName(user).then((loginUserData:any)=>{
        //     setFollowUser(loginUserData.follow);
        //     setMyPostID(loginUserData.post)
        // })

            //ログインしているユーザーのドキュメントへの参照を取得
            const docusesinformation = doc(db, "user", user.uid);
            //上記を元にドキュメントのデータを取得
            const userDataDoc =  await getDoc(docusesinformation);
            //取得したデータから必要なものを取り出す
            const userDatas = userDataDoc.data();
            // ログインしているユーザーのフォローしている人のuseridを配列に格納
            const UseLoginUserFollowUserIdArray =  userDatas?.follow


            setFollowUser(UseLoginUserFollowUserIdArray)

        const postDataArray:any[]=[];

        // followuserのpostドキュメントを配列に格納
        UseLoginUserFollowUserIdArray.forEach(async(followUserId:any)=>{
        const q = query(collection(db, "post"), where("userId", "==", followUserId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const followUserPost =(doc.id, " => ", doc.data());
            postDataArray.push(followUserPost)
        });
        })

        // ログインしているユーザーのpost情報を配列に格納
        const myPostId = userDatas?.posts
        console.log(userDatas?.posts)
        for(let postid of myPostId ){
                const information = doc(db, "post", postid);
                const DataDoc =  await getDoc(information);
                const Datas = DataDoc.data();
                // console.log(postDatas)
                postDataArray.push(Datas)
        }

        // データを保持
        setPostData(postDataArray)

    // ランダムの数値のpostを取得
        const getRandomArbitrary =(min:number, max:number)=> {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1) + min)
        }

        const randomArray:any[]=[];
        const q = query(collection(db, "post"), where("number", "==", getRandomArbitrary(1,5)));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const followUserPost =(doc.id, " => ", doc.data());
            randomArray.push(followUserPost)
        });
        setRamData(randomArray)



    }})
    },
    [favbtn]
    // [postData]
    )

    console.log(postData)

    // 日付順に並び替え
    postData.sort((a: any, b: any) => {
    return a.postDate.toDate() > b.postDate.toDate()  ? -1 : 1;
    });

    const CommentDisplay =(e:any) =>{
        setCommentDisplay(true)
  }

  const CommentBack =(e:any) =>{
    setCommentDisplay(false)
}

    return (
    <>
    <Header show={true} />
    <div>
    {followUser.length === 0 ? (
        <>
        <div>
        {postData.map((data:any,index:any)=>{
            const timestamp = data.postDate.toDate()
            const year = timestamp.getFullYear()
            const month = (timestamp.getMonth()+1)
            const day = timestamp.getDate()
            const hour = timestamp.getHours()
            const min = timestamp.getMinutes()
            const seco = timestamp.getSeconds()
            const favos = [...data.favorites]
            const com =[...data.comments]
            return(
            <>
        <div key={index}>
        
        {/* 画像 */}
        <div style={{width:"100%",marginTop:"10px"}} >
        <Link to="/PostDetails" state={{postid:data.postId,userid:data.userId}}><img src={data.imageUrl} style={{margin:"auto",display:"block"}}/></Link>
        </div>
        
        {/* いいねコメント保存 */}
        <div style={{display: "flex",marginBottom:"0"}}>
        {/* いいねボタン */}
        <div style={{margin:"10px 5px 0px 5px"}}>
        {data.favorites.includes(loginUserName)?(
        <AiFillHeart size={30} color={"red"}
        onClick={(e:any) =>{
            updateDoc(doc(collection(db, "post"), data.postId), {
                favorites:arrayRemove(loginUserName),
                });
            setFavbtn(favbtn+1)
            }
        } />
        ):(
        <AiOutlineHeart size={30} color={"black"}
        onClick={(e:any) =>{
            updateDoc(doc(collection(db, "post"), data.postId), {
                favorites:arrayUnion(loginUserName),
            });
            setFavbtn(favbtn+1)
            }
        } />
        )}
        </div>

        {/* コメントボタン */}
        <div style={{margin:"10px 5px 0px 5px"}}>
        <AiOutlineMessage size={30} color={"black"} onClick={CommentDisplay} />
        </div>

        {/* 保存ボタン */}
        <div style={{margin:"5px 5px 0px auto"}}>
        {loginUserKeep.includes(data.postId) ? (
        <RemoveKeepButton postId={data.postId} />
        ) : (
        <AddKeepButton postId={data.postId} />
        )}
        </div>

        </div>

        {/* いいね数、投稿時間 */}
        <div style ={{fontSize:"16px",display:"flex"}}>
        <div style={{marginLeft:"5px",}}>いいね！: {favos.length}人</div>
        <div style={{marginLeft:"auto"}}>{year}年{month}月{day}日{hour}:{min}:{seco}</div>
        </div>

        {/* キャプション */}
        <div style ={{fontSize:"16px",margin:"5px"}}>
        <p>{data.caption}</p>
        </div>
        

        <div>
        {commentDisplay ? (
        <>
        {/* コメント表示 */}
        <div>
    {com.map((data:any,index:any)=>{
    return(
    <div key={index} style={{display:"flex",fontSize:"14px",width:"100%",margin:"3px"}}>
    <p style={{fontWeight:"500"}}>{data.userName}</p>
    <p style={{marginLeft:"5px"}}>{data.commentText}</p>
    </div>
    )
    })}
    </div>

        <div style ={{display:"flex",width:"100%"}}>
        {/* コメント投稿セット */}
        <div style={{display:"flex",width:"70%",height:"30px",margin:"5px"}} >
        <input type="text" value={inputComment} onChange={(e)=>{setInputComment(e.target.value)}}
         style={{width:"100%"}}/>
         </div>

         <div style={{marginLeft:"auto",width:"30%"}}>
         <button onClick={async(e:any)=>{
         // 押された投稿のcommentにinputCommentを配列で追加
         updateDoc(doc(collection(db, "post"), data.postId), {
             comments:arrayUnion({userName:loginUserName,commentText:inputComment}),
             });
         setFavbtn(favbtn+1)
         setInputComment("")
         }}>投稿する</button>
         </div>
        <AiOutlineClose  style={{display:"block",margin: "15px 0 0 auto",alignItems:"center"}} size={15} color={"rgb(38, 38, 38)"} onClick={CommentBack} />
        </div>

        </>
        ):(
        <>
        </>
        )}
        </div>

  

        </div>
        </>
        )})}
        </div>
        </>
       
):(
        <>
        <div>
        {postData.map((data:any,index:any)=>{
            const timestamp = data.postDate.toDate()
            const year = timestamp.getFullYear()
            const month = (timestamp.getMonth()+1)
            const day = timestamp.getDate()
            const hour = timestamp.getHours()
            const min = timestamp.getMinutes()
            const seco = timestamp.getSeconds()
            const favos = [...data.favorites]
            const com =[...data.comments]
            return(
            <>
        <div key={index}>
        
        {/* 画像 */}
        <div style={{width:"100%",marginTop:"10px"}} >
        <Link to="/PostDetails" state={{postid:data.postId,userid:data.userId}}><img src={data.imageUrl} style={{margin:"auto",display:"block"}}/></Link>
        </div>
        
        {/* いいねコメント保存 */}
        <div style={{display: "flex",marginBottom:"0"}}>
        {/* いいねボタン */}
        <div style={{margin:"10px 5px 0px 5px"}}>
        {data.favorites.includes(loginUserName)?(
        <AiFillHeart size={30} color={"red"}
        onClick={(e:any) =>{
            updateDoc(doc(collection(db, "post"), data.postId), {
                favorites:arrayRemove(loginUserName),
                });
            setFavbtn(favbtn+1)
            }
        } />
        ):(
        <AiOutlineHeart size={30} color={"black"}
        onClick={(e:any) =>{
            updateDoc(doc(collection(db, "post"), data.postId), {
                favorites:arrayUnion(loginUserName),
            });
            setFavbtn(favbtn+1)
            }
        } />
        )}
        </div>

        {/* コメントボタン */}
        <div style={{margin:"10px 5px 0px 5px"}}>
        <AiOutlineMessage size={30} color={"black"} onClick={CommentDisplay} />
        </div>

        {/* 保存ボタン */}
        <div style={{margin:"5px 5px 0px auto"}}>
        {loginUserKeep.includes(data.postId) ? (
        <RemoveKeepButton postId={data.postId} />
        ) : (
        <AddKeepButton postId={data.postId} />
        )}
        </div>

        </div>

        {/* いいね数、投稿時間 */}
        <div style ={{fontSize:"16px",display:"flex"}}>
        <div style={{marginLeft:"5px",}}>いいね！: {favos.length}人</div>
        <div style={{marginLeft:"auto"}}>{year}年{month}月{day}日{hour}:{min}:{seco}</div>
        </div>

        {/* キャプション */}
        <div style ={{fontSize:"16px",margin:"5px"}}>
        <p>{data.caption}</p>
        </div>
        

        <div>
        {commentDisplay ? (
        <>
        {/* コメント表示 */}
        <div>
    {com.map((data:any,index:any)=>{
    return(
    <div key={index} style={{display:"flex",fontSize:"14px",width:"100%",margin:"3px"}}>
    <p style={{fontWeight:"500"}}>{data.userName}</p>
    <p style={{marginLeft:"5px"}}>{data.commentText}</p>
    </div>
    )
    })}
    </div>

        <div style ={{display:"flex",width:"100%"}}>
        {/* コメント投稿セット */}
        <div style={{display:"flex",width:"70%",height:"30px",margin:"5px"}} >
        <input type="text" value={inputComment} onChange={(e)=>{setInputComment(e.target.value)}}
         style={{width:"100%"}}/>
         </div>

         <div style={{marginLeft:"auto",width:"30%"}}>
         <button onClick={async(e:any)=>{
         // 押された投稿のcommentにinputCommentを配列で追加
         updateDoc(doc(collection(db, "post"), data.postId), {
             comments:arrayUnion({userName:loginUserName,commentText:inputComment}),
             });
         setFavbtn(favbtn+1)
         setInputComment("")
         }}>投稿する</button>
         </div>
        <AiOutlineClose  style={{display:"block",margin: "15px 0 0 auto",alignItems:"center"}} size={15} color={"rgb(38, 38, 38)"} onClick={CommentBack} />
        </div>

        </>
        ):(
        <>
        </>
        )}
        </div>

  

        </div>
        </>
        )})}
        </div>
        </>
    )}
    </div>
    <Footer />
    </>
    )
    };

    export default PostLook;
