import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../organisms/Footer'
import Header from '../organisms/Header'

function Delete() {
  return (
    <div>
    <Header show={true} />
       <p>削除しました</p> 
       <Link to="/" ><button>Topページに戻る</button></Link>
       <Footer />
    </div>
  )
}

export default Delete
