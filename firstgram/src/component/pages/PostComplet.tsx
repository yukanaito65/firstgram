import { Link } from "react-router-dom"
import Footer from "../organisms/Footer"
import Header from "../organisms/Header"


function PostComplet() {
  return (
    <div>
        <Header show={true} />
        <div className="lead_article"
        // style={{marginTop:"60px"}}
        >
        {/* <div style={{width:"100%"}}> */}
        <p className="lead_center"
        // style={{textAlign:"center"}}
        >投稿が完了しました</p>
        {/* </div> */}
        <div className="lead_center"
        // style={{textAlign:"center"}}
        >
        {/* style={{margin:"0 auto",}} */}
        <Link to="/" ><button className='btn'>Topページに戻る</button></Link>
        </div>
        </div>
        <Footer />
    </div>
  )
}

export default PostComplet
