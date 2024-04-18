import { NavLink } from "react-router-dom"
import logo from '../../assets/logo.png'
import { IoHomeOutline, IoLayersOutline, IoCloudUploadOutline } from "react-icons/io5"
import { IoMdNotificationsOutline } from "react-icons/io"
import { BsDatabase, BsPiggyBank } from "react-icons/bs"
import { SlSettings } from "react-icons/sl"
import { useSelector } from "react-redux"

const CreatorSidebar = () => {
     const { profile } = useSelector(state => state.profile);

     return (
          <div className="sidebar-container">
                       <div className="sidebar-logo">
                                <NavLink to={`/creator/${profile.username !== 'null' ? profile.username : profile._id}/`}>
                                          <img src={logo} alt="" />
                                </NavLink>
                       </div>
                       <div className="sidebar-nav">
                                    <ul>
                                              <li>
                                                       <NavLink to={`/creator/${profile.username !== 'null' ? profile.username : profile._id}/`}><span><IoHomeOutline /></span> <p>Dashboard</p></NavLink>
                                             </li>
                                             <li>
                                                       <NavLink to={`/creator/${profile.username !== 'null' ? profile.username : profile._id}/my-brands`}><span><IoLayersOutline /></span> <p>My Brands</p></NavLink>
                                             </li>
                                             <li>
                                                       <NavLink to={`/creator/${profile.username !== 'null' ? profile.username : profile._id}/new`}><span><IoCloudUploadOutline /></span> <p>Create</p></NavLink>
                                             </li>
                                             <li>
                                                       <NavLink to={`/creator/${profile.username !=='null' ? profile.username : profile._id}/notifications`}><span><IoMdNotificationsOutline /></span> <p>Notifications</p></NavLink>
                                             </li>
                                             <li>
                                                       <NavLink to={`/creator/${profile.username !=='null' ? profile.username : profile._id}/moments`}><span><BsDatabase /></span> <p>Shared Brand Moments</p></NavLink>
                                             </li>
                                             {/* <li>
                                                       <NavLink to={'/earnings'}><span><BsPiggyBank /></span> <p>My Earnings</p></NavLink>
                                             </li> */}
                                             <li>
                                                       <NavLink to={`/creator/${profile.username !== 'null' ? profile.username : profile._id}/settings`}><span><SlSettings /></span><p> Settings</p></NavLink>
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