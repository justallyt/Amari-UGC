import "../../css/creator/rewards.css"
import { sidebarContext } from "../../components/Creator/context/sidebarContext"
import CreatorSidebar from "../../components/Creator/Sidebar"
import MobileSidebar from "../../components/Creator/MobileSidebar"
import RewardsBody from "../../components/Creator/RewardsBody"
import { useState } from "react"
const CreatorRewards = () => {
    const [sidebarStatus, setSidebarStatus] = useState(false);
  return (
    <div className="dashboard-wrapper">
             <div className="dashboard-inner">
                          <CreatorSidebar />
                          <sidebarContext.Provider value={[sidebarStatus, setSidebarStatus]}>
                                   <MobileSidebar />
                                   <RewardsBody />
                          </sidebarContext.Provider>
             </div>
    </div>
  )
}

export default CreatorRewards