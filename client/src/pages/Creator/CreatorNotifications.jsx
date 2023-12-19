import { useState } from "react"
import NotificationsBody from "../../components/Creator/NotificationsBody"
import CreatorSidebar from "../../components/Creator/Sidebar"
import "../../css/creator/notifications.css"
import { sidebarContext } from "../../components/Creator/context/sidebarContext"
const CreatorNotifications = () => {
  const [status, setStatus] = useState(false)
  return (
    <div className="dashboard-wrapper">
                 <div className="dashboard-inner">
                            <CreatorSidebar />
                            <sidebarContext.Provider value={[status, setStatus]}>
                                     <NotificationsBody />
                            </sidebarContext.Provider> 
                 </div>
    </div>
  )
}

export default CreatorNotifications