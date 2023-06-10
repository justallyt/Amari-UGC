import { TbSearch } from "react-icons/tb"
import { IoMdNotificationsOutline } from "react-icons/io"
import dummyprofile from  '../../assets/dummyprofile.jpg'
import portrait from "../../assets/portrait1.jpg"
const Topbar = () => {
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
                             <div className="profile-part">
                                         <div className="profile-image">
                                                    <img src={portrait} alt="" />
                                         </div>
                                         <div className="fly-box">
                                                 
                                         </div>
                             </div>
                  </div>
    </div>
  )
}

export default Topbar