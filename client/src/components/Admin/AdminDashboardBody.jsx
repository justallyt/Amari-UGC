import AdminTopbar from "./AdminTopbar"
import MainTopbar from "./MainTopbar"
import { IoBusinessOutline} from "react-icons/io5"
import {BsPeople, BsCreditCard2Front} from "react-icons/bs"
import { VscGitPullRequestGoToChanges, VscArrowUp } from 'react-icons/vsc'
import AnalyticsSection from "./AnalyticsSection"
import TransactionList from "./TransactionList"
import Footer from "../Footer"
import { useSelector } from "react-redux"
import { useGetAdminProfileQuery } from "../../redux/admin/adminSlice"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setProfile } from "../../redux/profileSlice"
const AdminDashboardBody = () => {
  const { adminRequests } = useSelector(state => state.admin)
 const dispatch = useDispatch();
  const { data: profile, isLoading } = useGetAdminProfileQuery({ refetchOnMountOrArgChange: true})

  useEffect(() => {
     if(!isLoading && profile){
          dispatch(setProfile({...profile.user}))
     }
  }, [profile, dispatch, isLoading])

  return (
    <div className="admin-dashboard-wrapper">
                 <AdminTopbar />
                 <MainTopbar />
                 <div className="admin-inner">
                             <div className="admin-dashboard-content">
                                         <div className="admin-intro">
                                                   <h2>Welcome Back, Admin Albert</h2>
                                                   <p>Manage the entire platform from here</p>
                                         </div>

                                         <div className="quick-numbers-boxes">
                                                      <div className="quick-number-box-moja">
                                                                   <div className="type">
                                                                               <div className="name-n-number">
                                                                                         <h4>Brands</h4>
                                                                                         <h2>215</h2>
                                                                               </div>
                                                                               <span><IoBusinessOutline /></span>
                                                                   </div>
                                                                   <div className="percent">
                                                                              <span><VscArrowUp />13%</span>
                                                                              <p>Since last month</p>
                                                                   </div>
                                                      </div>
                                                      <div className="quick-number-box-moja">
                                                                   <div className="type">
                                                                               <div className="name-n-number">
                                                                                         <h4>Creators</h4>
                                                                                         <h2>1784</h2>
                                                                               </div>
                                                                               <span><BsPeople /></span>
                                                                   </div>
                                                                   <div className="percent">
                                                                              <span><VscArrowUp />30%</span>
                                                                              <p>Since last month</p>
                                                                   </div>
                                                      </div>
                                                      <div className="quick-number-box-moja">
                                                                   <div className="type">
                                                                               <div className="name-n-number">
                                                                                         <h4>Transactions</h4>
                                                                                         <h2><figure>Ksh.</figure>124,250</h2>
                                                                               </div>
                                                                               <span><BsCreditCard2Front/></span>
                                                                   </div>
                                                                   <div className="percent">
                                                                              <span><VscArrowUp />19%</span>
                                                                              <p>Since last month</p>
                                                                   </div>
                                                      </div>
                                                      <div className="quick-number-box-moja">
                                                                   <div className="type">
                                                                               <div className="name-n-number">
                                                                                         <h4>Tasks</h4>
                                                                                         <h2>{ adminRequests && adminRequests.length}</h2>
                                                                               </div>
                                                                               <span><VscGitPullRequestGoToChanges /></span>
                                                                   </div>
                                                                   <div className="percent">
                                                                              <span><VscArrowUp />4%</span>
                                                                              <p>New Tasks</p>
                                                                   </div>
                                                      </div>
                                         </div>
                              </div>

                              <AnalyticsSection />

                              <TransactionList />
                   
                 </div>
                 <Footer />
    </div>
  )
}

export default AdminDashboardBody