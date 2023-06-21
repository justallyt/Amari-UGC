import DashboardBody from "../../components/Consumer/DashboardBody"
import ConsumerSidebar from "../../components/Consumer/Sidebar"
import "../../css/consumer/dashboard.css"
import { useDispatch } from "react-redux"
import { useGetUserProfileQuery } from "../../redux/usersSlice"
import { setProfile } from "../../redux/profileSlice"
import { useEffect } from "react"

const ConsumerDashboard = () => {  
  const dispatch = useDispatch();
  //Get User Profile
  const { data, isLoading } = useGetUserProfileQuery()

  useEffect(() => {
        if(!isLoading && data){
             dispatch(setProfile({...data.user}))
         }
  }, [data, dispatch, isLoading])

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