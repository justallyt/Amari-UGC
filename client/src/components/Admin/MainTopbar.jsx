import { NavLink } from "react-router-dom"
import { RxDashboard } from "react-icons/rx"
import { IoBusinessOutline, IoSettingsOutline } from "react-icons/io5"
import { CgMenuRight } from "react-icons/cg"
import {BsPeople, BsCreditCard2Front} from "react-icons/bs"
import { VscGitPullRequestGoToChanges } from 'react-icons/vsc'
import { useState } from "react"
const MainTopbar = () => {
     const [status, setStatus] = useState(false)

     const toggleSidebar = () => setStatus(!status)
  return (
    <div className="main-topbar">
               <div className="admin-inner">
                     <ul className={ status ? 'active' : ''}>
                            <li><NavLink className='active' to={'/admin/dd/'}><span><RxDashboard /></span> Dashboard</NavLink></li>
                            <li><NavLink to={'/admin/brands'}><span><IoBusinessOutline /></span>Brands</NavLink></li>
                            <li><NavLink to={'/admin/creators'}><span><BsPeople /></span>Creators</NavLink></li>
                            <li><NavLink to={'/admin/transactions'}><span><BsCreditCard2Front /></span>Transactions</NavLink></li>
                            <li><NavLink to={'/admin/tasks'}><span><VscGitPullRequestGoToChanges /></span>Tasks</NavLink></li>
                            <li><NavLink to={'/admin/settings'}><span><IoSettingsOutline /></span>Settings</NavLink></li>
                    </ul>

                      <div className="menu-btn">
                                 <span onClick={toggleSidebar}><CgMenuRight /></span>
                      </div>
               </div>
    </div>
  )
}

export default MainTopbar