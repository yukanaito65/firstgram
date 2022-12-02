import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../molecules/Footer'
import Header from '../molecules/Header'

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
