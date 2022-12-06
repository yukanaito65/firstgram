import React from 'react'
import { Link } from 'react-router-dom';
import OneThirdPost from '../atoms/pictures/OneThirdPost';

//keepPostIds,keepPosts
//一覧に並んでいる投稿のそれぞれのユーザーidが必要
function KeepPostList(props:any) {
  return (
    <>
    {props.keepPosts.length > 0 ? (
            <div className="keepPostList">
          {props.keepPosts.map((keepPost: any) => {
            return (
              <div className='keepPostList_image'>
                <Link
                  to={"/PostDetails"}
                  state={{
                    userid: keepPost.userId,
                    postid: keepPost.postId
                  }}
                >
                  <OneThirdPost imageUrl={keepPost.imageUrl} />
                </Link>
                </div>
            );
          })}
          </div>
          ) :(
            <div>
              <p>保存済みの投稿はありません</p>
            </div>
          )}
    </>
  )
}

export default KeepPostList
