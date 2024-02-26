import BrandSettingsBody from "../../components/Brand/settings/BrandSettingsBody"
import '../../css/brand/brand_settings.css'
import { brandSidebarContext } from "../../components/Brand/context/sidebar"
import { useState } from "react"
import BrandMobileSidebar from "../../components/Brand/BrandMobileSidebar"
const BrandSettings = () => {
  const [sidebarStatus, setSidebarStatus] = useState(false);
  return (
       <brandSidebarContext.Provider value={[sidebarStatus, setSidebarStatus]}>
             <BrandSettingsBody />
             <BrandMobileSidebar />
       </brandSidebarContext.Provider>
  )
}

export default BrandSettings