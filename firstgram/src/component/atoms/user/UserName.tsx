import React from 'react'
import { User } from '../../../types/types';

interface Props {
  users: User;
}

function UserName(props:Props) {
  return (
    <div>{props.users.userName}</div>
  )
}

export default UserName
