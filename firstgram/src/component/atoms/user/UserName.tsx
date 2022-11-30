import React from 'react'

//usersでpropsを受け取る
function UserName(props:any) {
  return (
    <div>{props.users.userName}</div>
  )
}

export default UserName
