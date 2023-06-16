import { NavLink } from "react-router-dom"
import Topbar from "./Topbar"
import { BsArrowLeft } from "react-icons/bs"
import { useSelector } from "react-redux"
import { MdOutlineAccountCircle } from 'react-icons/md'
import { SlArrowRight } from "react-icons/sl"
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
                                                                          <li><NavLink to={'/'}>Notifications</NavLink></li>
                                                                          <li><NavLink to={'/'}>Integrations</NavLink></li>
                                                                          <li><NavLink to={'/'}>Security</NavLink></li>
                                                                          <li><NavLink to={'/'}>Billing</NavLink></li>
                                                                          <li><NavLink to={'/'}>Preferences</NavLink></li>
                                                                    </ul>
                                                        </div>

                                                        <div className="settings-columns">
                                                                 
                                                        </div>
                                            </div>
                                  </div>
                        </div>
             </div>
    </div>
  )
}

export default SettingsBody