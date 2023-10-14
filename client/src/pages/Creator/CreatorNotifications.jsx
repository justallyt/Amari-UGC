import NotificationsBody from "../../components/Creator/NotificationsBody"
import CreatorSidebar from "../../components/Creator/Sidebar"
import "../../css/creator/notifications.css"
const CreatorNotifications = () => {
  return (
    <div className="dashboard-wrapper">
                 <div className="dashboard-inner">
                            <CreatorSidebar />
                            <NotificationsBody />
                 </div>
    </div>
  )
}

export default CreatorNotifications