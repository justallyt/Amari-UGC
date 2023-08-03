import AdminTasksBody from "../../components/Admin/AdminTasksBody"
import AdminTopbar from "../../components/Admin/AdminTopbar"
import MainTopbar from "../../components/Admin/MainTopbar"
import "../../css/admin/admin_tasks.css"
const AdminTasks = () => {
  return (
    <>
           <AdminTopbar />
           <MainTopbar />
           <AdminTasksBody />
    </>
  )
}

export default AdminTasks