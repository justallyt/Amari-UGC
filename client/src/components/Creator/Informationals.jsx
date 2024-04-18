import { NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BsPlayFill } from 'react-icons/bs'
import { openModal, setUserAssets, setAvailableBrands, setUserApprovedBrands } from "../../redux/utilsSlices"
import 'react-loading-skeleton/dist/skeleton.css'
import { BsPatchPlus } from "react-icons/bs"
import { calculateTimePassed, sanitizeNotifications } from "../../utils/dateConverter"
import AssetModal from "./AssetModal"
import { useGetUserAssetsQuery } from "../../redux/assetSlice"
import { FiPlus } from "react-icons/fi";
import { useGetUserProfileQuery, useSubscribeToBrandMutation } from "../../redux/usersSlice"
//import { MdChevronLeft } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast"
import Spinner3 from "../Spinner3";
import { setProfile } from "../../redux/profileSlice"
const Informationals = () => {
  const [videoId, setVideoId] = useState(null)
  const { isModalOpen, assets, brands, availableBrands } = useSelector(state => state.utils);
  const { profile, all_notifications } = useSelector(state => state.profile)
  const { data:assets_pulled } = useGetUserAssetsQuery({refetchOnMountOrArgChange: true})
 const [ subscribe, { isLoading }] = useSubscribeToBrandMutation();
 const { data: refetched_profile, refetch } = useGetUserProfileQuery({ refetchOnMountOrArgChange: true });


 const dispatch = useDispatch();
  const openVideoModal = (id) => {
         dispatch(openModal())
         setVideoId(id)
  }
  useEffect(() => {
         if(assets_pulled){
               dispatch(setUserAssets([...assets_pulled.assets]))
         }
         if(refetched_profile){
              dispatch(setProfile({...refetched_profile.user}))
         }
  }, [assets_pulled,dispatch, refetched_profile])
  //sanitize activity notifications
  const activities = all_notifications !== null ? [...all_notifications].reverse() : []
  const user_assets = assets !== null ? assets : []

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

  const subscribeToBrand = async(brandId) => {
       try {
              //const res = await submitRequest({brandId})
              const res = await subscribe({brandId});
                if(res) {
                       
                       refetch();
                       toast.success(res.data.status, { id: 'request status'})
                }
           } catch (error) {
            console.log(error)
      }
  }
  return (
    <div className="informationals-section">
                 <Toaster />
              <div className="section-wrapper">
                       <div className="informationals-creations">
                                <div className="popular-brands">
                                          <h2>Popular brands</h2>

                                          <div className="brands-list">
                                                { availableBrands && availableBrands.length > 0 ? 
                                                   <>
                                                          { availableBrands && availableBrands.slice(0, 5).map(item => 
                                                                <div className="popular-brand-moja" key={item.name}>
                                                                        <div className="brand-logo">
                                                                             <img src={item.profilePic.url} alt="Brand Logo" />
                                                                        </div>
                                                                        <div className="brand-overlay" title="Subscribe"></div>
                                                                         <div className="action-stuff" onClick={() => subscribeToBrand(item._id)}>
                                                                                  
                                                                                  { isLoading ? <Spinner3 /> :  <span title="Subscribe"><FiPlus /></span>}
                                                                         </div>
                                                                         
                                                             </div>
                                                          )}
                                                   </>
                                             : <p>Eerie silence here</p>}
                                          </div>
                                </div>
                                <div className="creation-header">
                                            <h2>Your shared Brand moments</h2>
                                </div>
                               { isModalOpen ?  <AssetModal identity={videoId} />: ''}
                                <div className="creations-row">
                                       { user_assets && user_assets.length > 0 ? 
                                            <>
                                              { user_assets.slice(-3).reverse().map((item, index) =>
                                                <div className="creation-moja" key={`${item._id}${index}vsjl`}>
                                                            <div className="creation-thumbnail">
                                                                     <img src={item.asset.thumbnail} alt="" />
                                                                     <div className="overlay-play">
                                                                                <span onClick={() => openVideoModal(item._id)}><BsPlayFill /></span>
                                                                     </div>
                                                              </div>
                                                           <h3>{item.created_for}</h3>
                                                           <p>{item.brand_product}</p> 
                                                 </div>
                                               )}
                                            </>:
                                          
                                            <div className="video-skeleton">
                                                       <NavLink to={`/creator/${profile.username !== 'null' ? profile.username : profile._id}/new`}>
                                                                      <div className="skele-box">
                                                                                <p>Create your first Video</p>
                                                                                <span><BsPatchPlus /></span>
                                                                      </div>
                                                       </NavLink>
                                            </div>
                                      }
                                </div>

                                <div className="activity-panel">
                                            <h2>History</h2>

                                            <div className="panel-switch-tabs">
                                                        <div className="switch">
                                                                    <h3>Activity</h3>
                                                        </div>
                                            </div>

                                            <div className="tab-row">
                                                     { activities.length > 0 ? 
                                                             <> 
                                                                      {activities &&  sanitizeNotifications(activities).slice(0,4).map(item => 
                                                                          <div className="activity-moja" key={item._id}>
                                                                                  <div className="activity-block">
                                                                                           <div className="activity-thumbnail">
                                                                                                   <img className={profile._id === item.sender.senderId ? '' : 'brand'} src={item.sender.profilePhoto} alt="" />
                                                                                           </div>
                                                                                           <div className="activity-user">
                                                                                                      <h5>
                                                                                                             { item.notification_type === 'Request' || item.notification_type === 'Upload' ? 'You' :
                                                                                               item.sender.senderName 
                                                                                                             }
                                                                                                      </h5>
                                                                                                      <p>{profile._id === item.sender.senderId && item.sender.senderMsg || item.receipient.receipientMsg}</p>
                                                                                           </div>
                                                                                  </div>
                                                                                  <div className="time"> 
                                                                                          <p>{calculateTimePassed(item.createdAt)}</p>
                                                                                   </div>
                                                                        </div>
                                                                    )}
                                                             </>    : 
                                                             <p className="silence">Eerie silence over here</p>
                                                     }
                                                     
                                            </div>
                                </div>
                       </div>
              </div>
    </div>
  )
}

export default Informationals