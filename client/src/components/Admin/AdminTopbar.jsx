import logo from "../../assets/logo.png"
import dummy from "../../assets/creator1.jpg"
import { NavLink } from "react-router-dom"
import { IoSearchOutline, IoNotificationsOutline } from "react-icons/io5"
// import { BsChatRightText } from "react-icons/bs"
// import { AiOutlineShoppingCart } from "react-icons/ai"
const AdminTopbar = () => {
  return (
    <div className="topbar">
                <div className="admin-inner">
                           <div className="topbar-content">
                                       <div className="topbar-left">
                                                 <NavLink to={'/'}>
                                                             <div className="logo">
                                                                      <img src={logo} alt="Logo" />
                                                             </div>
                                                 </NavLink>
                                                 <div className="search-area">
                                                            <span><IoSearchOutline /></span>
                                                 </div>
                                       </div>
                                       <div className="topbar-right">
                                                  <span><IoNotificationsOutline /> <div className="small-pop"></div></span>
                                                  {/* <span><BsChatRightText /></span>
                                                  <span><AiOutlineShoppingCart /></span> */}

                                                  <div className="admin-profile">
                                                              <img src={dummy} alt="profile image" />
                                                  </div>
                                       </div>
                           </div>
                </div>
    </div>
  )
}

export default AdminTopbar