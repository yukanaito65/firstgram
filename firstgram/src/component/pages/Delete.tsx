import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../organisms/Footer'
import Header from '../organisms/Header'

function Delete() {
  return (
    <div >
    <Header show={true} />
    <div style={{width:"100%"}}>
       <p style={{margin:"50px",display:"block",textAlign:"center"}}>削除しました</p> 
       <Link to="/" ><button className='btn' style={{margin:"0 auto"}}>Topページに戻る</button></Link>
       </div>
       <Footer />
    </div>
  )
}

export default Delete
