import AdminTopbar from "./AdminTopbar"
import MainTopbar from "./MainTopbar"
import { IoBusinessOutline} from "react-icons/io5"
import {BsPeople, BsCreditCard2Front} from "react-icons/bs"
import { VscGitPullRequestGoToChanges, VscArrowUp } from 'react-icons/vsc'

const AdminDashboardBody = () => {
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
                                         </div>
                              </div>
                 </div>
    </div>
  )
}

export default AdminDashboardBody