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
                                           <p></p>
                                </div>
                     </div>
            </div>
    </div>
  )
}

export default RewardsBody