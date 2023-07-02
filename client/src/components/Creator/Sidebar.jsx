import { NavLink } from "react-router-dom"
import logo from '../../assets/logo.png'
import { IoHomeOutline, IoLayersOutline, IoCloudUploadOutline } from "react-icons/io5"
import { BsDatabase, BsPiggyBank } from "react-icons/bs"
import { SlSettings } from "react-icons/sl"
import { useSelector } from "react-redux"
const CreatorSidebar = () => {
     const { profile } = useSelector(state => state.profile);
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
                                                       <NavLink to={`/creator/${profile.username !== 'null' ? profile.username : profile._id}/`}><span><IoHomeOutline /></span> Dashboard</NavLink>
                                             </li>
                                             <li>
                                                       <NavLink to={'/consumer/my-brands'}><span><IoLayersOutline /></span> My Brands</NavLink>
                                             </li>
                                             <li>
                                                       <NavLink to={`/creator/${profile.username !== 'null' ? profile.username : profile._id}/new`}><span><IoCloudUploadOutline /></span> Create</NavLink>
                                             </li>
                                             <li>
                                                       <NavLink to={'/content'}><span><BsDatabase /></span> My Creations</NavLink>
                                             </li>
                                             <li>
                                                       <NavLink to={'/earnings'}><span><BsPiggyBank /></span> My Earnings</NavLink>
                                             </li>
                                             <li>
                                                       <NavLink to={`/creator/${profile.username !== 'null' ? profile.username : profile._id}/settings`}><span><SlSettings /></span> Settings</NavLink>
                                             </li>
                                    </ul>
                       </div>

                       <div className="help">
                                <NavLink to={'/help'}>Need any Help?</NavLink>
                       </div>
          </div>
     )
}

export default CreatorSidebar