import BrandAssetsBody from "../../components/Brand/BrandAssetsBody"
import Sidebar from "../../components/Brand/Sidebar"
import "../../css/brand/brand-assets.css"
const BrandAssets = () => {
  return (
    <div className="brand-dashboard-wrapper">
                 <div className="dashboard-inner">
                            <Sidebar />
                            <div className="brand-dashboard-skewed">
                                       <BrandAssetsBody />
                            </div>
                 </div>
    </div>
  )
}

export default BrandAssets