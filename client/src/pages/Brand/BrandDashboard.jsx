import BrandDashboardBody from "../../components/Brand/BrandDashboardBody"
import "../../css/brand/dashboard_brand.css"
import { useDispatch, useSelector } from "react-redux"
import { useGetUserProfileQuery } from "../../redux/usersSlice"
import { setProfile } from "../../redux/profileSlice"
import { useEffect } from "react"
import { useGetAllAssetsForBrandQuery, useGetAllCreatorsForBrandQuery } from "../../redux/brand/brandSlice"
import { setBrandAssets, setBrandCreators } from "../../redux/brand/brandUtils"
import Spinner from "../../components/Spinner"
import {  setPulledCreators } from "../../redux/utilsSlices"
import "../../css/brand/creators.css"
const BrandDashboard = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector(state => state.profile);
  const { creators } = useSelector(state => state.utils);
  //Get User Profile
  const { data: brand_profile, isLoading, refetch } = useGetUserProfileQuery({  refetchOnMountOrArgChange: true })
  const { data: all_creators } = useGetAllCreatorsForBrandQuery({ refetchOnMountOrArgChange: true})
  const { data: brand_assets } = useGetAllAssetsForBrandQuery({ refetchOnMountOrArgChange: true })
  useEffect(()=> {
           if(!isLoading && brand_profile){
                  refetch();
                  dispatch(setProfile({...brand_profile.user}));
           }
          if(all_creators){
                dispatch(setPulledCreators({...all_creators.creators}))
          }
          if(brand_assets){
                 dispatch(setBrandAssets([...brand_assets.assets]))
          }
  }, [isLoading, dispatch, refetch, brand_profile, all_creators, brand_assets])  

  //Filter brand creators
  useEffect(()=> {
         if(creators !== null){
                let things = [];
                profile !== null && profile.creators.forEach(item => {
                        const stuff = Object.values(creators).find(kitu => kitu._id === item);
                        things.push(stuff);
                })

                dispatch(setBrandCreators(things)); // select specific creators for specific brands

                //const avails = Object.values(creators).filter(obj => things.indexOf(obj) === -1);

                //set available creators not subscribed yet


         }
  }, [creators, dispatch, profile])
  return (
    <>
         { profile ? 
                  <>
                       <BrandDashboardBody />
                  </>
                  : 
                 <Spinner />
          }      
    </>
  )
}

export default BrandDashboard