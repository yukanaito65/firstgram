import { Link } from "react-router-dom";
import MyPost from "../atoms/pictures/MyPost";

//そのユーザーのpost配列の情報が必要posts
function MyPostList(props: any) {
  console.log(props.users.userId);
  console.log(props.posts);
  return (
    <div>
      {props.posts.length > 0 ? (
        <div className="myPostList">
          {props.posts.map((post: any) => {
            return (
              // <div style={{width: "300px", height: "300px", objectFit: "cover"}}>
              <div className="myPostList_image-div">
                {/* <div className="myPostList_image-height"> */}
                <Link
                  to="/PostDetails"
                  state={{
                    userid: props.users.userId,
                    postid: post.postId,
                  }}
                >
                  <MyPost imageUrl={post.imageUrl} />
                </Link>
                {/* </div> */}
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          {props.message}
        </div>
      )}
    </div>
  ); //return
}

export default MyPostList;
