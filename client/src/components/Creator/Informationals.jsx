import { NavLink } from "react-router-dom"
import { MdOutlineVideoFile } from "react-icons/md"
import { useGetUserAssetsQuery } from "../../redux/assetSlice"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setVideoAssets } from "../../redux/utilsSlices"
import { BsPlayFill } from 'react-icons/bs'
import VideoModal from "./VideoModal"
import { openModal } from "../../redux/utilsSlices"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { BsPatchPlus } from "react-icons/bs"
import { calculateTimePassed } from "../../utils/dateConverter"
const Informationals = () => {
  const [videoId, setVideoId] = useState(null)
  const { isModalOpen, videos } = useSelector(state => state.utils);
  const { profile, all_notifications } = useSelector(state => state.profile)
  const dispatch = useDispatch();

  const { data, isLoading } = useGetUserAssetsQuery({  refetchOnMountOrArgChange: true })

  useEffect(()=> {
          if(!isLoading && data){
                   dispatch(setVideoAssets(data.assets))
          }
  }, [data, isLoading, dispatch])

  const openVideoModal = (id) => {
         dispatch(openModal())
         setVideoId(id)
  }

  //sanitize activity notifications
  const activities = all_notifications !== null ? [...all_notifications].reverse() : []
  return (
    <div className="informationals-section">
              <div className="section-wrapper">
                       <div className="informationals-creations">
                                <div className="creation-header">
                                            <h2>Recently Added Creations</h2>
                                            <NavLink to={`/creator/${profile.username !== 'null' ? profile.username : profile._id}/new`}>Create New <span><MdOutlineVideoFile /></span></NavLink>
                                </div>
                               { isModalOpen ?  <VideoModal identity={videoId} />: ''}
                                <div className="creations-row">
                                       { videos && videos.length > 0 ? 
                                            <>
                                              { videos.slice(-3).reverse().map(item =>
                                                <div className="creation-moja" key={item._id}>
                                                            <div className="creation-thumbnail">
                                                                     { isLoading ?  <Skeleton height={250} /> : <img src={item.video.thumbnail} alt="" />}
                                                                     <div className="overlay-play">
                                                                                <span onClick={() => openVideoModal(item._id)}><BsPlayFill /></span>
                                                                     </div>
                                                              </div>
                                                           { isLoading ?  <Skeleton /> : <h3>{item.created_for}</h3>}
                                                          { isLoading ?  <Skeleton /> : <p>{item.brand_product}</p>}
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
                                                     <h4>Today</h4>

                                                     {activities &&  activities.slice(0,4).map(item => 
                                                        <div className="activity-moja" key={item._id}>
                                                                <div className="activity-block">
                                                                         <div className="activity-thumbnail">
                                                                                 <img src={item.sender.profilePhoto} alt="" />
                                                                         </div>
                                                                         <div className="activity-user">
                                                                                    <h5>Sender</h5>
                                                                                    <p>{item.sender.senderMsg || item.receipient.receipientMsg}</p>
                                                                         </div>
                                                                </div>
                                                                <div className="time"> 
                                                                        <p>{calculateTimePassed(item.createdAt)}</p>
                                                                 </div>
                                                         </div>
                                                     )}
                                                     
                                            </div>
                                </div>
                       </div>
              </div>
    </div>
  )
}

export default Informationals