import { useSelector } from "react-redux"
import Topbar from "./Topbar"

const NotificationsBody = () => {
    const { profile } = useSelector(state => state.profile);
  return (
    <div className="dashboard-body-wrap">
                <div className="dashboard-row">
                           <Topbar user={profile} />

                           <div className="notifications-wrapper">
                                      <h2>All Notifications</h2>
                           </div>
                </div>
    </div>
  )
}

export default NotificationsBody