import DashboardBody from "../../components/Creator/DashboardBody"
import CreatorSidebar from "../../components/Creator/Sidebar"
import "../../css/creator/dashboard_creator.css"
import { useDispatch, useSelector } from "react-redux"
import { useGetUserProfileQuery } from "../../redux/usersSlice"
import { setProfile } from "../../redux/profileSlice"
import { useEffect } from "react"
import Spinner2 from "../../components/Spinner2"

const CreatorDashboard = () => {  
  const dispatch = useDispatch();
  const { profile } = useSelector(state => state.profile)
  //Get User Profile
  const { data, isLoading } = useGetUserProfileQuery({  refetchOnMountOrArgChange: true })

  useEffect(() => {
        if(!isLoading && data){
             dispatch(setProfile({...data.user}))
         }
  }, [data, dispatch, isLoading])

  return (
    <>
           { data && profile ? 
                  <div className="dashboard-wrapper">
                            <div className="dashboard-inner">
                                     <CreatorSidebar />
                                     <DashboardBody />
                            </div>
                           
                   </div>
                   : 
                   <Spinner2 />
           }
    </>
  )
}

export default CreatorDashboard