import { useDispatch, useSelector } from "react-redux"
import AdminDashboardBody from "../../components/Admin/AdminDashboardBody"
import "../../css/admin/dashboard_admin.css"
import { useGetAdminProfileQuery } from "../../redux/admin/adminSlice";
import { setProfile } from "../../redux/profileSlice";
import { useEffect } from "react";
import Spinner from "../../components/Spinner";

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const { data, isLoading } = useGetAdminProfileQuery({ refetchOnMountOrArgChange: true })
   const { profile } = useSelector(state => state.profile)

    useEffect(() => {
      if(!isLoading && data){
           dispatch(setProfile({...data.user}))
      }
   }, [data, dispatch, isLoading])

  return (
    <>
            { data && profile ? 
                  <AdminDashboardBody />
                  :
                  <Spinner />
            }
     </>
  )
}

export default AdminDashboard