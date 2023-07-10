import { useSelector } from "react-redux"
import Topbar from "./Topbar"
import { NavLink } from "react-router-dom"
import { MdOutlineVideoFile } from "react-icons/md"
import vid from "../../assets/review5.jpg"
import { BsPlayFill } from 'react-icons/bs'
import { FaHeart } from 'react-icons/fa'
const AssetsBody = () => {
    const { profile } = useSelector(state => state.profile)
       return (
            <div className="dashboard-body-wrap">
                       <div className="dashboard-row">
                                  <Topbar user={profile} />

                                  <div className="assets-body-wrap">
                                             <div className="intro">
                                                     <h2>My Creations</h2>
                                                     <div className="intro-column">
                                                                <p>View and manage all the assets that you have created so far</p>
                                                                <NavLink to={'/'}>Create New <span><MdOutlineVideoFile /></span></NavLink>
                                                     </div>
                                             </div>

                                             <div className="assets-videos">
                                                        <h4>5 Videos</h4>

                                                        <div className="assets-video-row">
                                                                   <div className="asset-video-moja">
                                                                              <img src={vid} alt="" />
                                                                              <div className="video-deets">
                                                                                         <span className="play"><BsPlayFill /></span>
                                                                                         <div className="video-tags">
                                                                                                   <h3>Standard Chartered</h3>
                                                                                                   <p>Product</p>
                                                                                         </div>
                                                                                         <div className="likes">
                                                                                                     <span><FaHeart /></span>
                                                                                                     <p>35k</p>
                                                                                         </div>
                                                                              </div>
                                                                   </div>
                                                                   <div className="asset-video-moja">
                                                                              <img src={vid} alt="" />
                                                                              <div className="video-deets">
                                                                                         <span className="play"><BsPlayFill /></span>
                                                                                         <div className="video-tags">
                                                                                                   <h3>Standard Chartered</h3>
                                                                                                   <p>Product</p>
                                                                                         </div>
                                                                                         <div className="likes">
                                                                                                     <span><FaHeart /></span>
                                                                                                     <p>35k</p>
                                                                                         </div>
                                                                              </div>
                                                                   </div>
                                                                   <div className="asset-video-moja">
                                                                              <img src={vid} alt="" />
                                                                              <div className="video-deets">
                                                                                         <span className="play"><BsPlayFill /></span>
                                                                                         <div className="video-tags">
                                                                                                   <h3>Standard Chartered</h3>
                                                                                                   <p>Product</p>
                                                                                         </div>
                                                                                         <div className="likes">
                                                                                                     <span><FaHeart /></span>
                                                                                                     <p>35k</p>
                                                                                         </div>
                                                                              </div>
                                                                   </div>
                                                                   <div className="asset-video-moja">
                                                                              <img src={vid} alt="" />
                                                                              <div className="video-deets">
                                                                                         <span className="play"><BsPlayFill /></span>
                                                                                         <div className="video-tags">
                                                                                                   <h3>Standard Chartered</h3>
                                                                                                   <p>Product</p>
                                                                                         </div>
                                                                                         <div className="likes">
                                                                                                     <span><FaHeart /></span>
                                                                                                     <p>35k</p>
                                                                                         </div>
                                                                              </div>
                                                                   </div>
                                                        </div>
                                             </div>
                                  </div>
                       </div>
            </div>
       )
}

export default AssetsBody