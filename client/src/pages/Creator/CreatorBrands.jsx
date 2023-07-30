import { useDispatch } from "react-redux"
import CreatorBrandsBody from "../../components/Creator/CreatorBrandsBody"
import CreatorSidebar from "../../components/Creator/Sidebar"
import "../../css/creator/creator_brands.css"
import { useCheckRequestsQuery } from "../../redux/usersSlice"
import { useEffect } from "react"
import { setRequestedBrands } from "../../redux/utilsSlices"
const CreatorBrands = () => {
  const dispatch = useDispatch();
  const { data, refetch } = useCheckRequestsQuery({  refetchOnMountOrArgChange: true })

  useEffect(()=> {
           if(data){
                 dispatch(setRequestedBrands({...data.user_requests}))
           }
  }, [data, dispatch])
  return (
    <div className="dashboard-wrapper">
             <div className="dashboard-inner">
                        <CreatorSidebar />
                        <CreatorBrandsBody refetchFn={refetch} />
             </div>
    </div>
  )
}

export default CreatorBrands