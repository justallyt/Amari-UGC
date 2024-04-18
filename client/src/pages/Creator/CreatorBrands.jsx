import { useDispatch, useSelector } from "react-redux"
import CreatorBrandsBody from "../../components/Creator/CreatorBrandsBody"
import CreatorSidebar from "../../components/Creator/Sidebar"
import "../../css/creator/creator_brands.css"
import { useCheckRequestsQuery, useGetBrandsQuery } from "../../redux/usersSlice"
import { sidebarContext } from "../../components/Creator/context/sidebarContext"
import { useEffect, useState } from "react"
import { setRequestedBrands, setUserApprovedBrands, setAvailableBrands, setPulledBrands } from "../../redux/utilsSlices"
import MobileSidebar from "../../components/Creator/MobileSidebar"
const CreatorBrands = () => {
  const [status, setStatus ] = useState(false)
  const dispatch = useDispatch();
  const { data: requests, refetch } = useCheckRequestsQuery({  refetchOnMountOrArgChange: true })
  const { data: allbrands} = useGetBrandsQuery({ refetchOnMountOrArgChange: true })
  const { profile } = useSelector(state => state.profile)
  const { brands } = useSelector(state => state.utils)

  useEffect(()=> {
           if(requests){
                 dispatch(setRequestedBrands({...requests.user_requests}))
           }
          if(allbrands){
                dispatch(setPulledBrands({...allbrands.brands}))
          }
  }, [allbrands, requests, dispatch])

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
    <div className="dashboard-wrapper">
             <div className="dashboard-inner">
                        <CreatorSidebar />
                         <sidebarContext.Provider value={[status, setStatus]}>
                                  <MobileSidebar />
                                  <CreatorBrandsBody refetchFn={refetch} />
                         </sidebarContext.Provider>
                       
             </div>
    </div>
  )
}

export default CreatorBrands