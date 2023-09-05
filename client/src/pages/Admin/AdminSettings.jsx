import AdminSettingsBody from "../../components/Admin/AdminSettingsBody"
import AdminTopbar from "../../components/Admin/AdminTopbar"
import MainTopbar from "../../components/Admin/MainTopbar"
import "../../css/admin/admin_settings.css"
const AdminSettings = () => {
  return (
    <div className="admin-dashboard-wrapper">
                <AdminTopbar />
                 <MainTopbar />
                 <AdminSettingsBody />
     </div>
  )
}

export default AdminSettings