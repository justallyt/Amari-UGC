import AdminTopbar from "../../components/Admin/AdminTopbar"
import BrandsTabBody from "../../components/Admin/BrandsTab/BrandsTabBody"
import MainTopbar from "../../components/Admin/MainTopbar"
import "../../css/admin/admin_brands.css"

const AdminBrandsBody = () => {
  return (
    <div className="admin-dashboard-wrapper">
              <AdminTopbar />
              <MainTopbar />
              <BrandsTabBody />
    </div>
  )
}

export default AdminBrandsBody