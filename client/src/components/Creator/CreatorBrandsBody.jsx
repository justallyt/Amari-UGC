import { useDispatch, useSelector } from "react-redux"
import Topbar from "./Topbar"
import { IoImagesOutline } from "react-icons/io5"
import { useGetBrandsQuery } from "../../redux/usersSlice"
import { useEffect, useState } from "react"
import { setPulledBrands, setUserApprovedBrands } from "../../redux/utilsSlices"
import RequestBtn from "./RequestBtn"
import SpinnerData from "../SpinnerData"
const CreatorBrandsBody = ({ refetchFn }) => {
    const [ myBrands, setMyBrands ] = useState(null)
    const [ availableBrands, setAvailableBrands] = useState()
    const { profile } = useSelector(state => state.profile)
    const { brands } = useSelector(state => state.utils);
    const dispatch = useDispatch()
    //get brands
    const { data, isLoading } = useGetBrandsQuery({  refetchOnMountOrArgChange: true })
    
    useEffect(()=>{
           if(data){
                   dispatch(setPulledBrands({...data.brands}))
           }
    }, [data, dispatch])
    
    //Filter Stuff
   useEffect(() => {
              if(brands){
                     let things = []
                     profile.brands.forEach(item => {
                            const stuff =  Object.values(brands).find(kitu => kitu._id === item)
                            things.push(stuff)
                   })
                   setMyBrands(things)
                   dispatch(setUserApprovedBrands(things))

                   const avails = Object.values(brands).filter(obj => things.indexOf(obj) === -1);
                   setAvailableBrands(avails)
          }

   }, [brands, setMyBrands, profile, dispatch])

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
                                                             { myBrands && myBrands.length >0  ?
                                                                     <>
                                                                      {  myBrands.map(item => 
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
                                                                                <h4>No brand yet</h4>
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