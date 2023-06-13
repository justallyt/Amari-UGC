import { TbSearch } from "react-icons/tb"
import { IoMdNotificationsOutline } from "react-icons/io"
import { BsEnvelope } from "react-icons/bs" 
import { FaRegUser } from "react-icons/fa"
import portrait from "../../assets/portrait1.jpg"
import { NavLink } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
const Topbar = () => {
  const [ status, setStatus ] = useState(false)
  const boxRef = useRef()

  useEffect(() => {
           document.addEventListener("click", handleClick, true)
  }, [])

  const handleClick = (e) => {
          if(boxRef.current && !boxRef.current.contains(e.target)){
                 setStatus(false);
          }else{
                 setStatus(true)
          }
  }
  return (
    <div className="topbar-section">
                  <div className="search-bar">
                             <span><TbSearch /></span>
                             <input type="text" placeholder="Search" className="search-control" />
                  </div>
                  <div className="notification-profile">
                             <div className="notification">
                                        <span><IoMdNotificationsOutline /></span>
                                        <span className="red-dot"></span>
                             </div>
                             <div className="profile-part" onClick={() => setStatus(true)}>
                                         <div className="profile-image">
                                                    <img src={portrait} alt="" />
                                         </div>
                             </div>
                  </div>
                  <div className={status ? "fly-box active"  : "fly-box"  } ref={boxRef}>
                          <div className="fly-box-wrap">
                                   <h4>User Profile</h4>

                                   <div className="account-profile">
                                             <div className="account-image">
                                                       <img src={portrait} alt="" />
                                             </div>
                                             <div className="account-details">
                                                         <h3>Abigail Bundi</h3>
                                                         <p><span><BsEnvelope /></span> abby@consult.com</p>
                                             </div>
                                   </div>

                                   <NavLink to={'/consumer/profile'} className='profile-link'>
                                               <span><FaRegUser /></span>
                                                 <div className="deets">
                                                             <h4>My Account</h4>
                                                             <p>Profile Settings</p>
                                                 </div>
                                   </NavLink>
                                   <div className="logout-btn">
                                             <button>Logout</button>
                                   </div>
                           </div>
                  </div>
    </div>
  )
}

export default Topbar