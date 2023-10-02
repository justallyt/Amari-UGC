import { NavLink } from "react-router-dom"
import { RxDashboard } from "react-icons/rx"
import { IoBusinessOutline, IoSettingsOutline } from "react-icons/io5"
import { CgMenuRight } from "react-icons/cg"
import {BsPeople, BsCreditCard2Front} from "react-icons/bs"
import { VscGitPullRequestGoToChanges } from 'react-icons/vsc'
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useGetAllBrandsQuery, useGetAllCreatorsQuery, useGetApprovedCreatorsQuery } from "../../redux/admin/adminSlice"
import { setAllBrandsForAdmin, setAllCreatorsForAdmin, setApprovedRequests } from "../../redux/admin/adminUtils"
const MainTopbar = () => {
     const [status, setStatus] = useState(false)

     const toggleSidebar = () => setStatus(!status)
     const { userInfo } = useSelector(state => state.auth)

     const { data: brands } = useGetAllBrandsQuery({  refetchOnMountOrArgChange: true })
     const { data: creators } = useGetAllCreatorsQuery({  refetchOnMountOrArgChange: true })
     const { data: approved } = useGetApprovedCreatorsQuery({ refetchOnMountOrArgChange: true});

     const dispatch = useDispatch();

     useEffect(() => {
                if(brands) dispatch(setAllBrandsForAdmin([...brands.all_brands]))
                if(creators) dispatch(setAllCreatorsForAdmin([...creators.all_creators]))
                if(approved) dispatch(setApprovedRequests([...approved.requests]))
     }, [brands, creators, approved, dispatch])
  return (
    <div className="main-topbar">
               <div className="admin-inner">
                     <ul className={ status ? 'active' : ''}>
                            <li><NavLink to={`/admin/${userInfo.id}`}><span><RxDashboard /></span> Dashboard</NavLink></li>
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