
import logo from "../../assets/twiga.png"
import logo2 from "../../assets/stanchart.png"
import { CgClose } from "react-icons/cg"
import { useDispatch, useSelector } from "react-redux"
import { closeModal } from "../../redux/utilsSlices"
import Video from "../Video"

const VideoModal = ({ identity }) => {
    const dispatch = useDispatch()
   const { isModalOpen, videos } = useSelector(state => state.utils);
   
    const closeVideoModal = () =>{
           dispatch(closeModal());
    }
  
    const activeVideo = videos.find(vid => vid._id === identity);
    
  return (
    <div className={isModalOpen ? "video-modal-wrapper active" : "video-modal-wrapper"}>
              <span className="close-btn" onClick={closeVideoModal}><CgClose /></span>
              <div className="modal-box">
                         <div className="video-part">
                                    <div className="modal-video-box"> 
                                              <Video source={activeVideo.video.url} />
                                    </div>
                         </div>
                         <div className="likes-part">
                                   <div className="likes-parts-inner">
                                            <h4>Asset Liked by</h4>
                                            <div className="brand-list">
                                                        <div className="brand-moja">
                                                                   <div className="brand-profile">
                                                                              <img src={logo} alt="" />
                                                                   </div>
                                                                   <h2>Twiga Foods</h2>
                                                        </div>
                                                        <div className="brand-moja">
                                                                   <div className="brand-profile">
                                                                              <img src={logo2} alt="" />
                                                                   </div>
                                                                   <h2>Standard Chartered</h2>
                                                        </div>
                                                        <p>{identity}</p>
                                            </div>
                                   </div>
                         </div>
              </div>
    </div>
  )
}

export default VideoModal