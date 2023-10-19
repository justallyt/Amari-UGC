import { useDispatch, useSelector } from "react-redux"
import Topbar from "./Topbar"
import { IoImagesOutline } from "react-icons/io5"
import { useGetBrandsQuery, useGetUserProfileQuery } from "../../redux/usersSlice"
import { useEffect } from "react"
import { setPulledBrands} from "../../redux/utilsSlices"
import RequestBtn from "./RequestBtn"
import SpinnerData from "../SpinnerData"
import { setProfile } from "../../redux/profileSlice"
const CreatorBrandsBody = ({ refetchFn }) => {
    //const [ availableBrands, setAvailableBrands] = useState()
    const { profile } = useSelector(state => state.profile)
    const { userBrands, availableBrands } = useSelector(state => state.utils);
    const dispatch = useDispatch()

    //get brands
    const { data:allbrands, isLoading } = useGetBrandsQuery({  refetchOnMountOrArgChange: true })
    const { data:refetched_profile } = useGetUserProfileQuery({ refetchOnMountOrArgChange: true})

    useEffect(()=>{
           if(allbrands){
                   dispatch(setPulledBrands({...allbrands.brands}))
           }
           if(refetched_profile) {
              dispatch(setProfile({...refetched_profile.user}))
           }
    }, [allbrands,refetched_profile, dispatch])
    
  return (
    <div className="dashboard-body-wrap">
               <div className="dashboard-row">
                           <Topbar user={profile} />

                           <div className="brand-list-row">
                                      <div className="brand-list-header">
                                                  <h2>Brands</h2>
                                                  <p>Quickly browse through the brands you are working with. Additionally, you can also request to work with some of your favourite brands that you&apos;d like to work with.</p>
                                      </div>
                                      <div className="brand-list-body">
                                                 <h3>My Current Brands</h3>

                                                 <div className="current-brands">
                                                             { userBrands && userBrands.length >0  ?
                                                                     <>
                                                                      {  userBrands.map(item => 
                                                                                <div className="brand-moja" key={item._id}>
                                                                                         <div className="brand-image">
                                                                                                <img src={item.profilePic.url} alt="" />
                                                                                          </div>
                                                                                        <h4>{item.name}</h4>
                                                                               </div>
                                                                         )}
                                                                      </>  :
                                                                      <div className="brand-moja">
                                                                                <div className="brand-image">
                                                                                        <span><IoImagesOutline /></span>
                                                                                </div>
                                                                                <h4>Not subscribed to any brand</h4>
                                                                     </div>
                                                               }
                                                              
                                                 </div>

                                                 <div className="available-brands">
                                                             <h3>Available Brands</h3>

                                                             { isLoading ? 
                                                                  <div className="spinning-and-get-data">
                                                                        <SpinnerData />
                                                                  </div>   :
                                                                  <>
                                                                      { availableBrands && availableBrands.length > 0 ? 
                                                                           <>
                                                                                  { availableBrands && availableBrands.map(item => 
                                                                                 <div className="available-brand-moja" key={item.name}>
                                                                                 <div className="left-items">
                                                                                                <div className="brand-profile">
                                                                                                          <img src={item.profilePic.url} alt="Brand Logo" />
                                                                                                </div>
                                                                                                <h4>{item.name}</h4>
                                                                                 </div>
                                                                                 <div className="right-items">
                                                                                            <RequestBtn id={item._id} refetch={refetchFn} />
                                                                                 </div>
                                                                          </div>
                                                                        )}
                                                                           </>
                                                                       : <p>You&apos;ve probably subscribed to all of them. Stay tuned.</p>
                                                                       }
                                                              </>
                                                            }
                                                              
                                                             
                                                 </div>
                                      </div>
                           </div>
               </div>
    </div>
  )
}

export default CreatorBrandsBody