import { useState } from "react"
import { brandSidebarContext } from "../../components/Brand/context/sidebar";
import Sidebar from "../../components/Brand/Sidebar";
import "../../css/brand/brand_rewards.css"
import BrandRewardsBody from "../../components/Brand/BrandRewardsBody";

const BrandRewards = () => {
    const [sidebarStatus, setSidebarStatus]  = useState(false);
  return (
    <brandSidebarContext.Provider value={[sidebarStatus, setSidebarStatus]}>
                     <div className="brand-dashboard-wrapper">
                                     <div className="dashboard-inner">
                                                <Sidebar />
                                                <div className="brand-dashboard-skewed">
                                                            <BrandRewardsBody />
                                                </div>
                                     </div>
                     </div>
    </brandSidebarContext.Provider>
  )
}

export default BrandRewards