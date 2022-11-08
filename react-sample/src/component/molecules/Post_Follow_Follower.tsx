import React from 'react'
import { GetLoginUserData } from '../data/GetLoginUserData'

function Post_Follow_Follower() {
  return (
    <>
    <div>
        <div>
            <GetLoginUserData
            fieldName='' />
        投稿
        </div>
         <div>
            <GetLoginUserData
            fieldName={"follower".length} />
            フォロワー
         </div>
        <div>
        <GetLoginUserData
            fieldName={"follow".length} />
        フォロー中
        </div>
    </div>
    </>
  )
}

export default Post_Follow_Follower
