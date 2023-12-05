import { NavLink } from "react-router-dom"
import { BsFileEarmarkText } from "react-icons/bs"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BsPlayFill } from 'react-icons/bs'
import { openModal, setUserAssets} from "../../redux/utilsSlices"
import 'react-loading-skeleton/dist/skeleton.css'
import { BsPatchPlus } from "react-icons/bs"
import { calculateTimePassed, sanitizeNotifications } from "../../utils/dateConverter"
import AssetModal from "./AssetModal"
import { useGetUserAssetsQuery } from "../../redux/assetSlice"

const Informationals = () => {
  const [videoId, setVideoId] = useState(null)
  const { isModalOpen, assets } = useSelector(state => state.utils);
  const { profile, all_notifications } = useSelector(state => state.profile)
  const { data:assets_pulled } = useGetUserAssetsQuery({refetchOnMountOrArgChange: true})

 const dispatch = useDispatch();
  const openVideoModal = (id) => {
         dispatch(openModal())
         setVideoId(id)
  }
  useEffect(() => {
         if(assets_pulled){
               dispatch(setUserAssets([...assets_pulled.assets]))
         }
  }, [assets_pulled,dispatch])
  //sanitize activity notifications
  const activities = all_notifications !== null ? [...all_notifications].reverse() : []
  const user_assets = assets !== null ? assets : []

  return (
    <div className="informationals-section">
              <div className="section-wrapper">
                       <div className="informationals-creations">
                                <div className="creation-header">
                                            <h2>Recently Added Creations</h2>
                                            <NavLink to={`/creator/${profile.username !== 'null' ? profile.username : profile._id}/new`}>Create New <span><BsFileEarmarkText /></span></NavLink>
                                </div>
                               { isModalOpen ?  <AssetModal identity={videoId} />: ''}
                                <div className="creations-row">
                                       { user_assets && user_assets.length > 0 ? 
                                            <>
                                              { user_assets.slice(-3).reverse().map(item =>
                                                <div className="creation-moja" key={item._id}>
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