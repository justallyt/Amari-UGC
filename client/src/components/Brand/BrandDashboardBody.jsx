import MiddlePart from "./MiddlePart"
import Sidebar from "./Sidebar"
import Footer from "../Footer"

const BrandDashboardBody = () => {
  return (
    <div className="brand-dashboard-wrapper">
               <div className="dashboard-inner">
                         <Sidebar />
                         <div className="brand-dashboard-skewed">
                                   <div className="brand-dashboard-skewed-inner">
                                            <MiddlePart />
                                   </div>
                                   <Footer />
                         </div>

                         
               </div>
               
    </div>
  )
}

export default BrandDashboardBody