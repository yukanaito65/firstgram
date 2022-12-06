import React from 'react'
import { User } from '../../../types/types';

interface Props {
  users: User;
}

function Name(props:Props) {
  return (
    <div>{props.users.name}</div>
  )
}

export default Name
