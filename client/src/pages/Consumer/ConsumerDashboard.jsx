import DashboardBody from "../../components/Consumer/DashboardBody"
import ConsumerSidebar from "../../components/Consumer/Sidebar"
import "../../css/consumer/dashboard.css"
import { useDispatch } from "react-redux"
import { useGetUserProfileQuery } from "../../redux/usersSlice"
import { setProfile } from "../../redux/profileSlice"
const ConsumerDashboard = () => {  
  const dispatch = useDispatch();
  //Get User Profile
  const { data, isLoading } = useGetUserProfileQuery()
  
  if(!isLoading && data){
    dispatch(setProfile({...data.user}))
  }
  
  return (
    <>
        <div className="dashboard-wrapper">
                 <div className="dashboard-inner">
                          <ConsumerSidebar />
                          <DashboardBody />
                 </div>
        </div>
    </>
  )
}

export default ConsumerDashboard