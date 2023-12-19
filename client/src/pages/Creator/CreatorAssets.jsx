import { useState } from "react"
import AssetsBody from "../../components/Creator/AssetsBody"
import CreatorSidebar from "../../components/Creator/Sidebar"
import "../../css/creator/assets_creator.css"
import { sidebarContext } from "../../components/Creator/context/sidebarContext"
import MobileSidebar from "../../components/Creator/MobileSidebar"
const CreatorAssets = () => {
  const [status, setStatus] = useState(false)
  return (
    <div className="dashboard-wrapper">
              <div className="dashboard-inner">
                         <CreatorSidebar />
                         <sidebarContext.Provider value={[status, setStatus]}>
                                   <AssetsBody />
                                   <MobileSidebar />
                         </sidebarContext.Provider>
              </div>
    </div>
  )
}

export default CreatorAssets