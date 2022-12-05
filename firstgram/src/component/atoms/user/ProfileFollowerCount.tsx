import { Link } from "react-router-dom";

interface Props {
  followerCount:number;
  link: string;
  uid: string;
  userId: string;
}
//followerList,link,userId,uid
function ProfileFollowerCount(props: Props) {
  // const [followerNum, setFollowerNum] = useState<any>(props.followerList.length);

  // const followerNum = useSelector((state:any)=>state.followerCountSlice.follower);

  //ログインユーザーのuid
  //そのページを表示している人のuserIdとfollower配列
  return (
    <div
    // style={{textAlign: "center", width: "80px"}}
    className="profileFollowerCount"
    >
    <Link
      to={props.link}
      state={{
        userId: props.userId,
        uid: props.uid,
      }}
    >
      <p>
      <span
      // style={{fontWeight:"bold"}}
      className="profileFollowerCount__number">
        {/* {props.followerList.length} */}
        {props.followerCount}
        </span><br/>
        フォロワー
      </p>
      {/* <div>{followerNum}</div> */}
    </Link>
    </div>
  );
}

export default ProfileFollowerCount;
