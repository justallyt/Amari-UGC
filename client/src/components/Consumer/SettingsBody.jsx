import { NavLink } from "react-router-dom"
import Topbar from "./Topbar"
import { BsArrowLeft, BsCreditCard2Back } from "react-icons/bs"
import { useSelector } from "react-redux"
import { MdOutlineAccountCircle, MdSecurity } from 'react-icons/md'
import { SlArrowRight } from "react-icons/sl"
import { IoMdNotificationsOutline } from 'react-icons/io'
import { VscDebugDisconnect } from 'react-icons/vsc'
import { TfiBrushAlt } from "react-icons/tfi"
import ProfileCard from "./settings/ProfileCard"
const SettingsBody = () => {
  const { userInfo} = useSelector(state => state.auth)
  return (
    <div className="dashboard-body-wrap">
             <div className="dashboard-row">
                        <Topbar />

                        <div className="dashboard-wrapper">
                                  <NavLink to={`/${userInfo.id}`} className='back-btn'>
                                            <span><BsArrowLeft /></span>
                                            <h5>Back to Dashboard</h5>
                                  </NavLink>

                                  <div className="settings-body-wrap">
                                            <div className="settings-title">
                                                      <h2>Settings <span className="icon"><SlArrowRight /></span> <span>Profile</span></h2>
                                            </div>

                                            <div className="settings-types-row">
                                                        <div className="settings-sidebar">
                                                                    <ul>
                                                                          <li className="active"><NavLink to={'/'}><span><MdOutlineAccountCircle /></span> Profile</NavLink></li>
                                                                          <li><NavLink to={'/'}>
                                                                            <span><IoMdNotificationsOutline /></span>
                                                                            Notifications</NavLink></li>
                                                                          <li><NavLink to={'/'}>
                                                                             <span><VscDebugDisconnect /></span>
                                                                            Integrations</NavLink></li>
                                                                          <li><NavLink to={'/'}>
                                                                            <span><MdSecurity /></span>Security</NavLink></li>
                                                                          <li><NavLink to={'/'}><span><BsCreditCard2Back /></span> Billing</NavLink></li>
                                                                          <li><NavLink to={'/'}><span><TfiBrushAlt /></span>Preferences</NavLink></li>
                                                                    </ul>
                                                        </div>

                                                        <div className="settings-columns">
                                                                 <ProfileCard />
                                                        </div>
                                            </div>
                                  </div>
                        </div>
             </div>
    </div>
  )
}

export default SettingsBody