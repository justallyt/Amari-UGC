import { useState } from "react"
import SettingsBody from "../../components/Creator/SettingsBody"
import CreatorSidebar from "../../components/Creator/Sidebar"
import "../../css/creator/settings_creator.css"
import { sidebarContext } from "../../components/Creator/context/sidebarContext"
import MobileSidebar from "../../components/Creator/MobileSidebar"
const CreatorSettings = () => {
  const [status, setStatus] = useState(false)
  return (
    <div className="dashboard-wrapper">
              <div className="dashboard-inner">
                            <CreatorSidebar />
                             <sidebarContext.Provider value={[status, setStatus]}>
                                        <MobileSidebar />
                                       <SettingsBody />
                             </sidebarContext.Provider>
              </div>
    </div>
  )
}

export default CreatorSettings