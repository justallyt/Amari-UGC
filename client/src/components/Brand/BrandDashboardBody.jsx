import MiddlePart from "./MiddlePart"
import Sidebar from "./Sidebar"


const BrandDashboardBody = () => {
  return (
    <div className="brand-dashboard-wrapper">
               <div className="dashboard-inner">
                         <Sidebar />
                         <div className="brand-dashboard-skewed">
                                   <MiddlePart />
                         </div>
               </div>
    </div>
  )
}

export default BrandDashboardBody