import { useSelector } from "react-redux"
import Topbar from "./Topbar"

const RewardsBody = () => {
    const { profile } = useSelector(state => state.profile)
  return (
    <div className="dashboard-body-wrap">
            <div className="dashboard-row">
                     <Topbar user={profile} />

                     <div className="rewards-body-wrap">
                                <div className="rewards-body-header">
                                           <h2>My Rewards</h2>
                                           <p>Your dedication is appreciated!  Explore the valuable rewards awaiting you in recognition of your exceptional work crafting impactful brand moments.</p>
                                </div>
                                <div className="rewards-body-table">
                                           <table>
                                                     <thead>
                                                                 <tr>
                                                                           <th>Rewarder</th>
                                                                           <th>Type</th>
                                                                           <th>Name</th>
                                                                           <th>Code</th>
                                                                           <th>Description</th>
                                                                           <th>Date Rewarded</th>
                                                                 </tr>
                                                     </thead>
                                                     <tbody>
                                                               <tr>
                                                                          <td>
                                                                                    <div className="profile-pic">
                                                                                              
                                                                                    </div>
                                                                          </td>
                                                               </tr>
                                                     </tbody>
                                           </table>
                                </div>
                     </div>
            </div>
    </div>
  )
}

export default RewardsBody