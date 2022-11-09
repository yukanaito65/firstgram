import React from 'react';
import Icon from '../atoms/pictures/Icon';
import { GetLoginUserData } from '../data/GetLoginUserData';

// widthを引数に取りたい
function Icon_UserName() {
  return (
    <>
    <div>
    <Icon />
    <GetLoginUserData
    fieldName='userName' />
    </div>
    </>
  )
}

export default Icon_UserName
