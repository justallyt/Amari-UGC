import DashboardBody from "../../components/Creator/DashboardBody"
import CreatorSidebar from "../../components/Creator/Sidebar"
import "../../css/creator/dashboard_creator.css"
import { useDispatch, useSelector } from "react-redux"
import { useGetBrandsQuery, useGetUnreadUserNotificationsQuery, useGetUserNotificationsQuery, useGetUserProfileQuery } from "../../redux/usersSlice"
import { setAllNotifications, setProfile, setUnreadNotifications } from "../../redux/profileSlice"
import { setAvailableBrands, setPulledBrands, setUserApprovedBrands } from "../../redux/utilsSlices"

import { useEffect } from "react"
import Spinner from "../../components/Spinner"

const CreatorDashboard = () => {  
  const dispatch = useDispatch();
  const { profile } = useSelector(state => state.profile)
  const { brands } = useSelector(state => state.utils);
  //Get User Profile
  const { data: user_data, isLoading } = useGetUserProfileQuery({  refetchOnMountOrArgChange: true })
  const { data: user_notifications } = useGetUserNotificationsQuery({ refetchOnMountOrArgChange: true})
  const { data: unread_user_notifications } = useGetUnreadUserNotificationsQuery({ refetchOnMountOrArgChange: true})
  const { data:allbrands } = useGetBrandsQuery({ refetchOnMountOrArgChange: true})

  useEffect(() => {
        if(!isLoading && user_data){
             dispatch(setProfile({...user_data.user}))
         }
         if(user_notifications){
              dispatch(setAllNotifications([...user_notifications.notifications]))
         } 
         if(unread_user_notifications){
              dispatch(setUnreadNotifications([...unread_user_notifications.notifications]))
         }
  }, [user_data, user_notifications, unread_user_notifications, dispatch, isLoading])

  useEffect(()=>{
             if(allbrands){
                     dispatch(setPulledBrands({...allbrands.brands}))
             }
  }, [allbrands, dispatch])

//Filter user brands
useEffect(() => {
      if(brands !== null){
            let things = []
            profile !== null && profile.brands.forEach(item => {
                  const stuff =  Object.values(brands).find(kitu => kitu._id === item)
                  things.push(stuff)
            })
         //setMyBrands(things)
         dispatch(setUserApprovedBrands(things))

         const avails = Object.values(brands).filter(obj => things.indexOf(obj) === -1);
        // setAvailableBrands(avails)
        dispatch(setAvailableBrands(avails))
}

}, [brands, profile, dispatch])
  return (
    <>
           { user_data && profile ? 
                  <div className="dashboard-wrapper">
                            <div className="dashboard-inner">
                                     <CreatorSidebar />
                                     <DashboardBody />
                            </div>
                           
                   </div>
                   : 
                   <Spinner />
           }
    </>
  )
}

export default CreatorDashboard