import { NavLink } from "react-router-dom"
import vid1 from "../../assets/vid1.jpg"
import vid2 from "../../assets/vid2.jpg"
import vid3 from "../../assets/vid3.jpg"
import standard from "../../assets/standard.png"
import { MdOutlineVideoFile } from "react-icons/md"
import { useGetUserAssetsQuery } from "../../redux/videosSlice"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setVideoAssets } from "../../redux/utilsSlices"
import { BsPlayFill } from 'react-icons/bs'
import VideoModal from "./VideoModal"
import { openModal } from "../../redux/utilsSlices"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const Informationals = () => {
  const [videoId, setVideoId] = useState(null)
  const { isModalOpen, videos } = useSelector(state => state.utils);
  const { profile } = useSelector(state => state.profile)
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

                                                     <div className="activity-moja">
                                                                <div className="activity-block">
                                                                         <div className="activity-thumbnail">
                                                                                     <img src={vid1} alt="" />
                                                                         </div>
                                                                         <div className="activity-user">
                                                                                    <h5>You</h5>
                                                                                    <p>You uploaded a new video.</p>
                                                                         </div>
                                                                </div>
                                                                <div className="time"> 
                                                                        <p>1 min ago</p>
                                                                 </div>
                                                     </div>
                                                     <div className="activity-moja">
                                                                <div className="activity-block">
                                                                         <div className="activity-thumbnail">
                                                                                     <img src={standard} alt="" />
                                                                         </div>
                                                                         <div className="activity-user">
                                                                                    <h5>Standard Chartered</h5>
                                                                                    <p>Standard Chartered liked your post</p>
                                                                         </div>
                                                                </div>
                                                                <div className="time"> 
                                                                        <p>10 mins ago</p>
                                                                 </div>
                                                     </div>

                                                     <h4>Yesterday</h4>

                                                     <div className="activity-moja">
                                                                <div className="activity-block">
                                                                         <div className="activity-thumbnail">
                                                                                     <img src={vid2} alt="" />
                                                                         </div>
                                                                         <div className="activity-user">
                                                                                    <h5>You</h5>
                                                                                    <p>You post a new video</p>
                                                                         </div>
                                                                </div>
                                                                <div className="time"> 
                                                                        <p>Yesterday</p>
                                                                 </div>
                                                     </div>
                                                     <div className="activity-moja">
                                                                <div className="activity-block">
                                                                         <div className="activity-thumbnail">
                                                                                     <img src={vid3} alt="" />
                                                                         </div>
                                                                         <div className="activity-user">
                                                                                    <h5>Orchard Juice</h5>
                                                                                    <p>Orchard Juice liked your video</p>
                                                                         </div>
                                                                </div>
                                                                <div className="time"> 
                                                                        <p>Yesterday</p>
                                                                 </div>
                                                     </div>
                                            </div>
                                </div>
                       </div>
              </div>
    </div>
  )
}

export default Informationals