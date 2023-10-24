import BrandCreatorsBody from "../../components/Brand/BrandCreatorsBody"
import Sidebar from "../../components/Brand/Sidebar"

const BrandCreators = () => {
  return (
    <div className="brand-dashboard-wrapper">
                 <div className="dashboard-inner">
                           <Sidebar />
                           <div className="brand-dashboard-skewed">
                                       <BrandCreatorsBody />
                           </div>
                 </div>
    </div>
  )
}

export default BrandCreators