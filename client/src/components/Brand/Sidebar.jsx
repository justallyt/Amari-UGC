import { NavLink } from 'react-router-dom'
import logo from "../../assets/logo.png"
import { RxDashboard } from "react-icons/rx"
import { GiHumanPyramid } from "react-icons/gi"
import { BsClipboardData, BsCreditCard2Front } from "react-icons/bs"
import { SlSettings } from "react-icons/sl"
const Sidebar = () => {
      return (
             <div className="brand-sidebar">
                       <div className="brand-sidebar-content">
                                <NavLink to={'/brand/'}>
                                          <div className="logo">
                                                     <img src={logo} alt="" />
                                          </div>
                                </NavLink>

                                <div className="sidebar-menu">
                                             <ul>
                                                      <li><NavLink to={'/'} className='active'><span><RxDashboard /></span> Dashboard</NavLink></li>
                                                      <li><NavLink to={'/'}><span><GiHumanPyramid /></span>Creators</NavLink></li>
                                                      <li><NavLink to={'/'}><span><BsClipboardData /></span>Creations</NavLink></li>
                                                      <li><NavLink to={'/'}><span><BsCreditCard2Front /></span>Billing</NavLink></li>
                                                      <li><NavLink to={'/'}><span><SlSettings /></span>Settings</NavLink></li>
                                             </ul>
                                </div>
                       </div>
             </div>
      ) 
}

export default Sidebar