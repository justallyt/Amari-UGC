import logo from "../../assets/logo.png"
import dummy from "../../assets/creator1.jpg"
import { NavLink } from "react-router-dom"
import { IoSearchOutline, IoNotificationsOutline } from "react-icons/io5"
import { BsEnvelope } from "react-icons/bs"
import { FaUserAlt } from "react-icons/fa"
import { VscExtensions } from 'react-icons/vsc'
import { useEffect, useRef, useState } from "react"
// import { BsChatRightText } from "react-icons/bs"
// import { AiOutlineShoppingCart } from "react-icons/ai"
const AdminTopbar = () => {
  const [status, setStatus] = useState(false)
  const adminBoxRef = useRef()

  useEffect(() => {
          document.addEventListener("click", openProfileBox, true)
  }, [])

  const openProfileBox = (e) => {
         if(adminBoxRef.current && !adminBoxRef.current.contains(e.target)){
                setStatus(false)
         }else{
                setStatus(true)
         }
  }
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
                                                            <input type="text" className="search-box-control" placeholder="Search"/>
                                                 </div>
                                       </div>
                                       <div className="topbar-right">
                                                  <span><IoNotificationsOutline /> <div className="small-pop"></div></span>
                                                  {/* <span><BsChatRightText /></span>
                                                  <span><AiOutlineShoppingCart /></span> */}

                                                  <div className="admin-profile">
                                                              <img src={dummy} alt="profile image" onClick={() => setStatus(true)} />

                                                              <div className={ status ? "topbar-box active" : "topbar-box"} ref={adminBoxRef}>
                                                                       <h2>Admin Profile</h2>

                                                                       <div className="profile-n-name">
                                                                                 <div className="photo">
                                                                                            <img src={dummy} alt="" />
                                                                                 </div>
                                                                                 <div className="name-email">
                                                                                          <h3>Albert Okundi</h3>
                                                                                          <p><span><BsEnvelope /></span> platforms@amariconsult.com</p>
                                                                                 </div>
                                                                       </div>
                                                                       <div className="topbar-links">
                                                                                  <NavLink to={'/'}>
                                                                                            <div className="user-icon">
                                                                                                       <FaUserAlt />
                                                                                            </div>
                                                                                            <div className="title">
                                                                                                      <h4>My Profile</h4>
                                                                                                      <p>Account Settings</p>
                                                                                            </div>
                                                                                  </NavLink>
                                                                                  <NavLink to={'/'}>
                                                                                            <div className="user-icon">
                                                                                                       <VscExtensions />
                                                                                            </div>
                                                                                            <div className="title">
                                                                                                      <h4>My Tasks</h4>
                                                                                                      <p>Requests & Subscriptions</p>
                                                                                            </div>
                                                                                  </NavLink>
                                                                       </div>

                                                                       <button>Logout</button>
                                                              </div>
                                                  </div>
                                       </div>
                           </div>
                </div>
    </div>
  )
}

export default AdminTopbar