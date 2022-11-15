import React from 'react'
import FollowButton from './component/atoms/button/FollowButton'

function Follower() {
  return (
    <>
    <div>Follower</div>
    <FollowButton onClick={() => console.log("フォローする")} />
    </>
  )
}

export default Follower
