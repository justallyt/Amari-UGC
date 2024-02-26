import { CgMenu } from "react-icons/cg";
import { Link } from "react-router-dom";
import logo from '../../assets/logo.png'
import { BsSearch } from "react-icons/bs";
import { brandSidebarContext } from "./context/sidebar";
import { useContext, useState } from "react"
import { useSelector } from "react-redux"

export const MobileSidebarInitiator = () => {
    const [sidebarStatus, setSidebarStatus] = useContext(brandSidebarContext); 
    const [searchStatus, setSearchStatus] = useState(false);
    const openSidebar = () => setSidebarStatus(!sidebarStatus);
    const { profile } = useSelector(state => state.profile)
  return (
        <div className="middle-sidebar-initiate">
                 <span onClick={openSidebar}><CgMenu /></span>
                  <Link to={`/brand/${profile.username === 'null' ?  profile._id : profile.username}/`}>
                             <img src={logo} alt="" />
                 </Link>

                 <div className={ searchStatus ? "mobile-search active" : "mobile-search"}>
                           <span onClick={() => setSearchStatus(!searchStatus)}><BsSearch /></span>
                           <input type="text" className="mobile-search-control" placeholder="Search" />
                 </div>
      </div>
  )
}
