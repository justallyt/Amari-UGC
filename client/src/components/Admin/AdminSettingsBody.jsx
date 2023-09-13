import { HiOutlineUserCircle } from "react-icons/hi2"
import { IoMdNotificationsOutline } from "react-icons/io"
import { FaWpforms } from "react-icons/fa6"
import { GrShieldSecurity } from 'react-icons/gr'

const AdminSettingsBody = () => {
  return (
    <div className="admin-settings-body">
              <div className="admin-inner">
                         <div className="admin-settings-header">
                                    <h2>Account Settings</h2>
                         </div>

                         <div className="admin-settings-types">
                                     <div className="types-header">
                                                <div className="type active">
                                                           <span><HiOutlineUserCircle /></span>
                                                           <p>Profile</p>
                                                </div>
                                                <div className="type">
                                                           <span><IoMdNotificationsOutline /></span>
                                                           <p>Notifications</p>
                                                </div>
                                                <div className="type">
                                                           <span><FaWpforms /></span>
                                                           <p>Bills</p>
                                                </div>
                                                <div className="type">
                                                           <span><GrShieldSecurity /></span>
                                                           <p>Security</p>
                                                </div>
                                     </div>


                                     <div className="settings-tabs-container">
                                              
                                     </div>
                         </div>
              </div>
    </div>
  )
}

export default AdminSettingsBody