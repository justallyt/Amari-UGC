import AdminTopbar from "./AdminTopbar"
import MainTopbar from "./MainTopbar"


const AdminDashboardBody = () => {
  return (
    <div className="admin-dashboard-wrapper">
                 <AdminTopbar />
                 <MainTopbar />
                 <div className="admin-inner">
                            
                 </div>
    </div>
  )
}

export default AdminDashboardBody