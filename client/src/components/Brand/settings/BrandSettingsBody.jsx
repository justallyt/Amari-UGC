import Sidebar from "../Sidebar"
import { BsCreditCard2Back } from "react-icons/bs"
import { MdOutlineAccountCircle, MdSecurity } from 'react-icons/md'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { VscDebugDisconnect } from 'react-icons/vsc'
import { TfiBrushAlt } from "react-icons/tfi"
import ProfileAccount from "./ProfileAccount"
import { MobileSidebarInitiator } from "../MobileSidebarInitiator"

const BrandSettingsBody = () => {
  return (
    <div className="brand-dashboard-wrapper">
             <div className="dashboard-wrapper-inner">
                        <Sidebar />

                        <div className="brand-settings-skewed">
                                    <MobileSidebarInitiator />
                                  <div className="settings-header">
                                           <h2>Settings</h2>
                                           <p>Manage your account settings and preferences.</p>
                                  </div>

                                  <div className="settings-options">
                                             <ul>
                                                        <li className="active"><span><MdOutlineAccountCircle /></span> Profile</li>
                                                        <li><span><IoMdNotificationsOutline /></span>Notifications</li>
                                                        <li><span><VscDebugDisconnect /></span>Integrations</li>
                                                        <li><span><MdSecurity /></span>Security</li>
                                                        <li><span><BsCreditCard2Back /></span>Billing</li>
                                                        <li><span><TfiBrushAlt /></span>Preferences</li>
                                             </ul>
                                  </div>

                                  <div className="option-tabs">
                                             <ProfileAccount />
                                  </div>
                        </div>
            </div>
   </div>
  )
}

export default BrandSettingsBody