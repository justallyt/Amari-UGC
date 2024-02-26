import BrandAssetsBody from "../../components/Brand/BrandAssetsBody"
import Sidebar from "../../components/Brand/Sidebar"
import "../../css/brand/brand-assets.css"
import { brandSidebarContext } from "../../components/Brand/context/sidebar"
import { useState } from "react"
import BrandMobileSidebar from "../../components/Brand/BrandMobileSidebar"
const BrandAssets = () => {
  const [sidebarStatus, setSidebarStatus] = useState(false);
  return (
         <brandSidebarContext.Provider value={[sidebarStatus, setSidebarStatus]}>
                <div className="brand-dashboard-wrapper">
                      <div className="dashboard-inner">
                                <Sidebar />
                              <div className="brand-dashboard-skewed">
                                        <BrandAssetsBody />
                              </div>
                     </div>
               </div>
               <BrandMobileSidebar />
         </brandSidebarContext.Provider>
  )
}

export default BrandAssets