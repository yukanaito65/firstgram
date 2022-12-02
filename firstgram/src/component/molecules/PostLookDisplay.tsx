interface State {
    postData:any
}


function PostLookDisplay(props:State) {
    return (
<div>
{props.postData.map((data:any,index:any)=>{
const timestamp = data.postDate.toDate()
const year = timestamp.getFullYear()
const month = (timestamp.getMonth()+1)
const day = timestamp.getDate()
const hour = timestamp.getHours()
const min = timestamp.getMinutes()
const seco = timestamp.getSeconds()
const favos = [...data.favorites]
// const com =[...data.comments]
    return(
    <>
    <div key={index}>

    {/* 画像 */}
    {/* <div style={{width:"100%",marginTop:"10px"}} > */}
    {/* <Link to="/PostDetails" state={{postid:data.postId,userid:data.userId}}><img src={data.imageUrl} style={{margin:"auto",display:"block"}}/></Link> */}
    {/* </div> */}
        
    <p>いいねぼたんとか</p>

    {/* いいね数、投稿時間 */}
    <div style ={{fontSize:"16px",display:"flex"}}>
    <div style={{marginLeft:"5px",}}>いいね！: {favos.length}人</div>
    <div style={{marginLeft:"auto"}}>{year}年{month}月{day}日{hour}:{min}:{seco}</div>
    </div>

    {/* キャプション */}
    <div style ={{fontSize:"16px",margin:"5px"}}>
    <p>{data.caption}</p>
    </div>
        
    </div>
    </>
    )})}
    </div>
    )}
    

export default PostLookDisplay;
