import DashboardBody from "../../components/Creator/DashboardBody"
import ConsumerSidebar from "../../components/Creator/Sidebar"
import "../../css/creator/dashboard_creator.css"
import { useDispatch } from "react-redux"
import { useGetUserProfileQuery } from "../../redux/usersSlice"
import { setProfile } from "../../redux/profileSlice"
import { useEffect } from "react"

const CreatorDashboard = () => {  
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

export default CreatorDashboard