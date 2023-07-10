import AssetsBody from "../../components/Creator/AssetsBody"
import CreatorSidebar from "../../components/Creator/Sidebar"
import "../../css/creator/assets_creator.css"
const CreatorAssets = () => {
  return (
    <div className="dashboard-wrapper">
              <div className="dashboard-inner">
                         <CreatorSidebar />
                         <AssetsBody />
              </div>
    </div>
  )
}

export default CreatorAssets