 import React from 'react'
import AddKeepButton from './AddKeepButton'
import RemoveKeepButton from './RemoveKeepButton'
 
interface Props {
    loginUserKeep:any;
    data:any;

}

 function KeepButton(props:Props) {
   return (
    // <div style={{margin:"5px 5px 0px auto"}}>
    <div>
        {/* 保存ボタン追加!ログインユーザーのkeepPosts配列(loginUserKeep)に今表示しているpostのpostId(postId)が存在したら保存解除ボタン、存在しなかったら保存するボタン */}
    {props.loginUserKeep.includes(props.data) ? (
    <RemoveKeepButton postId={props.data} />
    ) : (
    <AddKeepButton postId={props.data} />
    )}
    </div>
    // </div>
   )
 }
 
 export default KeepButton
