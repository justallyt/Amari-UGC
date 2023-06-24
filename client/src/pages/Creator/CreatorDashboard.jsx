import DashboardBody from "../../components/Creator/DashboardBody"
import ConsumerSidebar from "../../components/Creator/Sidebar"
import "../../css/creator/dashboard_creator.css"
import { useDispatch, useSelector } from "react-redux"
import { useGetUserProfileQuery } from "../../redux/usersSlice"
import { setProfile } from "../../redux/profileSlice"
import { useEffect } from "react"

const CreatorDashboard = () => {  
  const dispatch = useDispatch();
  const { profile } = useSelector(state => state.profile)
  //Get User Profile
  const { data, isLoading } = useGetUserProfileQuery()

  useEffect(() => {
        if(!isLoading && data){
             dispatch(setProfile({...data.user}))
         }
  }, [data, dispatch, isLoading])

  return (
    <>
           { profile ? 
                  <div className="dashboard-wrapper">
                            <div className="dashboard-inner">
                                     <ConsumerSidebar />
                                     <DashboardBody />
                            </div>
                   </div>
                   : 
                  <div className="intermittent-wrapper">
                            <p className="intermittent">Fetching your data. Stay tuned.</p>
                  </div>
           }
    </>
  )
}

export default CreatorDashboard