import AdminTopbar from "../../components/Admin/AdminTopbar"
import MainTopbar from "../../components/Admin/MainTopbar"
import "../../css/admin/admin_brands.css"

const AdminBrandsBody = () => {
  return (
    <div className="admin-dashboard-wrapper">
              <AdminTopbar />
              <MainTopbar />
    </div>
  )
}

export default AdminBrandsBody