import BrandDashboardBody from "../../components/Brand/BrandDashboardBody"
import "../../css/brand/dashboard_brand.css"
import { useDispatch, useSelector } from "react-redux"
import { useGetUserProfileQuery } from "../../redux/usersSlice"
import { setProfile } from "../../redux/profileSlice"
import { useEffect } from "react"
const BrandDashboard = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector(state => state.profile);

  //Get User Profile
  const { data, isLoading, refetch } = useGetUserProfileQuery({  refetchOnMountOrArgChange: true })

  useEffect(()=> {
           if(!isLoading && data){
                  refetch();
                  dispatch(setProfile({...data.user}));
           }
  }, [isLoading, dispatch, refetch, data])  
  return (
    <>
         { data && profile ? 
                  <>
                       <BrandDashboardBody />
                  </>
                  : 
                  <div className="intermittent-wrapper">
                       <p className="intermittent">Fetching your data. Just a moment.</p>
                  </div>
          }      
    </>
  )
}

export default BrandDashboard