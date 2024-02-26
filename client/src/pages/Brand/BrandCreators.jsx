import BrandCreatorsBody from "../../components/Brand/BrandCreatorsBody"
import Sidebar from "../../components/Brand/Sidebar"
import { brandSidebarContext } from "../../components/Brand/context/sidebar"
import { useState } from "react"
import BrandMobileSidebar from "../../components/Brand/BrandMobileSidebar"
const BrandCreators = () => {
  const [sidebarStatus, setSidebarStatus] = useState(false);
  return (
    <brandSidebarContext.Provider value={[sidebarStatus, setSidebarStatus]}>
          <div className="brand-dashboard-wrapper">
                 <div className="dashboard-inner">
                           <Sidebar />
                           <div className="brand-dashboard-skewed">
                                       <BrandCreatorsBody />
                           </div>
                 </div>
          </div>
          <BrandMobileSidebar />
    </brandSidebarContext.Provider>
  )
}

export default BrandCreators