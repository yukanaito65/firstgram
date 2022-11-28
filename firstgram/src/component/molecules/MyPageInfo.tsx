import { QuerySnapshot } from 'firebase/firestore'
import React from 'react'
import FollowCount from '../atoms/user/FollowCount'
import FollowerCount from '../atoms/user/FollowerCount'
import PostCount from '../atoms/user/PostCount'

type Props = {
  posts: QuerySnapshot[],
  followerList: string[],
  followList: string[],
  uid: string,
}

function MyPageInfo(props:Props) {
  return (
    <div style={{display:"flex", width:"330px", justifyContent: "space-between"}}>
      <PostCount posts={props.posts}/>
      <FollowerCount
      followerList={props.followerList}
      link={"/myFollower"}
      uid={props.uid}
      />
      <FollowCount
      followList={props.followList}
      link={"/myFollow"}
      uid={props.uid}
      />
    </div>
  )
}

export default MyPageInfo
