import DashboardBody from "../../components/Creator/DashboardBody"
import CreatorSidebar from "../../components/Creator/Sidebar"
import "../../css/creator/dashboard_creator.css"
import { useDispatch, useSelector } from "react-redux"
import { useGetBrandsQuery, useGetUnreadUserNotificationsQuery, useGetUserNotificationsQuery, useGetUserProfileQuery } from "../../redux/usersSlice"
import { setAllNotifications, setProfile, setUnreadNotifications } from "../../redux/profileSlice"
import { setUserAssets, setAvailableBrands, setPulledBrands, setUserApprovedBrands } from "../../redux/utilsSlices"
import { useEffect, useState } from "react"
import Spinner from "../../components/Spinner"
import { useGetUserAssetsQuery } from "../../redux/assetSlice"
import MobileSidebar from "../../components/Creator/MobileSidebar"
import { sidebarContext } from "../../components/Creator/context/sidebarContext"

const CreatorDashboard = () => {  
  const dispatch = useDispatch();
  const [status, setStatus] = useState(false)
  const { profile } = useSelector(state => state.profile)
  const { brands } = useSelector(state => state.utils);
  //Get User Profile
  const { data: user_data } = useGetUserProfileQuery({  refetchOnMountOrArgChange: true })
  const { data: user_notifications } = useGetUserNotificationsQuery({ refetchOnMountOrArgChange: true})
  const { data: unread_user_notifications } = useGetUnreadUserNotificationsQuery({ refetchOnMountOrArgChange: true})
  const { data:allbrands } = useGetBrandsQuery({ refetchOnMountOrArgChange: true})
 const { data: user_assets } = useGetUserAssetsQuery({ refetchOnMountOrArgChange: true})

  useEffect(() => {
        if(user_data){
             dispatch(setProfile({...user_data.user}))
         }
         if(user_notifications){
              dispatch(setAllNotifications([...user_notifications.notifications]))
         } 
         if(unread_user_notifications){
              dispatch(setUnreadNotifications([...unread_user_notifications.notifications]))
         }
         if(user_assets){
               dispatch(setUserAssets([...user_assets.assets]))
         }
  }, [user_data, user_notifications, unread_user_notifications,user_assets, dispatch])

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
                                    <sidebarContext.Provider value={[status, setStatus]}>
                                             <MobileSidebar />
                                              <CreatorSidebar />
                                              <DashboardBody />
                                    </sidebarContext.Provider>
                            </div> 
                   </div>
                   : 
                   <Spinner />
           }
    </>
  )
}

export default CreatorDashboard