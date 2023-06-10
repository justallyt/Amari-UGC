import { NavLink } from "react-router-dom"
import logo from '../../assets/logo.png'
import { IoHomeOutline, IoLayersOutline, IoCloudUploadOutline } from "react-icons/io5"
import { BsDatabase, BsPiggyBank } from "react-icons/bs"
import { SlSettings } from "react-icons/sl"
const ConsumerSidebar = () => {
     return (
          <div className="sidebar-container">
                       <div className="sidebar-logo">
                                <NavLink to={'/'}>
                                          <img src={logo} alt="" />
                                </NavLink>
                       </div>
                       <div className="sidebar-nav">
                                    <ul>
                                              <li>
                                                       <NavLink to={'/'}><span><IoHomeOutline /></span> Dashboard</NavLink>
                                             </li>
                                             <li>
                                                       <NavLink to={'/'}><span><IoLayersOutline /></span> My Brands</NavLink>
                                             </li>
                                             <li>
                                                       <NavLink to={'/'}><span><IoCloudUploadOutline /></span> Create</NavLink>
                                             </li>
                                             <li>
                                                       <NavLink to={'/'}><span><BsDatabase /></span> My Creations</NavLink>
                                             </li>
                                             <li>
                                                       <NavLink to={'/'}><span><BsPiggyBank /></span> My Earnings</NavLink>
                                             </li>
                                             <li>
                                                       <NavLink to={'/'}><span><SlSettings /></span> Settings</NavLink>
                                             </li>
                                    </ul>
                       </div>
          </div>
     )
}

export default ConsumerSidebar