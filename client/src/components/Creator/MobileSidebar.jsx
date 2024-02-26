import { HiOutlineMenu } from "react-icons/hi";
import { NavLink } from "react-router-dom"
import logo from '../../assets/logo.png'
import { useContext, useEffect, useRef, useCallback } from "react";
import { sidebarContext } from "./context/sidebarContext";
import { IoHomeOutline, IoLayersOutline, IoCloudUploadOutline } from "react-icons/io5"
import { IoMdNotificationsOutline } from "react-icons/io"
import { BsDatabase, BsPiggyBank } from "react-icons/bs"
import { SlSettings } from "react-icons/sl"
import { useSelector } from "react-redux"

const MobileSidebar = () => {
  const { profile } = useSelector(state => state.profile)
  const [sidebarStatus, setSidebarStatus] = useContext(sidebarContext);
  const sidebarRef = useRef();

  const closeSidebar = useCallback((e) => {
       if(sidebarRef){
              if(!sidebarRef.current.contains(e.target)){
                    setSidebarStatus(false)
              }
       }

      setSidebarStatus(false)
}, [setSidebarStatus])

  useEffect(() => {
        document.addEventListener("click", closeSidebar, true);

        return () => document.removeEventListener("click", closeSidebar, true);
  }, [closeSidebar])



  return (
    <div className={sidebarStatus ? "mobile-sidebar-wrapper active" : "mobile-sidebar-wrapper"}>
             <div ref={sidebarRef}  className={ sidebarStatus ? "mobile-sidebar-content active" : "mobile-sidebar-content"}>
                       <div className="mobile-header">
                                <span onClick={closeSidebar}><HiOutlineMenu /></span>
                                <div className="mobile-logo">
                                           <img src={logo} alt="" />
                                </div>
                       </div>
                       <div className="mobile-nav">
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
                                                       <NavLink to={`/creator/${profile.username !=='null' ? profile.username : profile._id}/assets`}><span><BsDatabase /></span> <p>My Creations</p></NavLink>
                                             </li>
                                             <li>
                                                       <NavLink to={'/earnings'}><span><BsPiggyBank /></span> <p>My Earnings</p></NavLink>
                                             </li>
                                             <li>
                                                       <NavLink to={`/creator/${profile.username !== 'null' ? profile.username : profile._id}/settings`}><span><SlSettings /></span><p> Settings</p></NavLink>
                                             </li>
                                    </ul>
                       </div>
             </div>
    </div>
  )
}

export default MobileSidebar