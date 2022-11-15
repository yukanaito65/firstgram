import React from 'react'
import FollowButton from './component/atoms/button/FollowButton'

function Follow() {
  return (
    <FollowButton onClick={() => console.log("フォローする")} />
  )
}

export default Follow
