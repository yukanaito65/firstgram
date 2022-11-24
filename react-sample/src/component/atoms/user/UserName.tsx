import React from 'react'
import { User } from '../../../types/types'

//usersでpropsを受け取る
function UserName(props:any) {
  return (
    <div>{props.users.userName}</div>
  )
}

export default UserName
