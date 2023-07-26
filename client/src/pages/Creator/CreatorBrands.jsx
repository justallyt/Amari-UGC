import CreatorBrandsBody from "../../components/Creator/CreatorBrandsBody"
import CreatorSidebar from "../../components/Creator/Sidebar"
import "../../css/creator/creator_brands.css"
const CreatorBrands = () => {
  return (
    <div className="dashboard-wrapper">
             <div className="dashboard-inner">
                        <CreatorSidebar />
                        <CreatorBrandsBody />
             </div>
    </div>
  )
}

export default CreatorBrands