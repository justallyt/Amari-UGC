import { useDispatch, useSelector } from "react-redux"
import Topbar from "./Topbar"
import { NavLink } from "react-router-dom"
import { MdOutlineVideoFile } from "react-icons/md"
import { FaHeart } from 'react-icons/fa'
import AssetModal from "./AssetModal"
import { openModal } from "../../redux/utilsSlices"
import { useState } from "react"
const AssetsBody = () => {
      const [videoId, setVideoId] = useState(null)
    const { profile } = useSelector(state => state.profile)
    const { assets, isModalOpen } = useSelector(state => state.utils);
    const dispatch = useDispatch()

    const openVideoModal = (id) => {
          dispatch(openModal())
          setVideoId(id)
    }
       return (
            <div className="dashboard-body-wrap">
                       <div className="dashboard-row">
                                  <Topbar user={profile} />
                                 { isModalOpen ? <AssetModal identity={videoId}/> : ''}
                                  <div className="assets-body-wrap">
                                             <div className="intro">
                                                     <h2>My Creations</h2>
                                                     <div className="intro-column">
                                                                <p>View and manage all the assets that you have created so far</p>
                                                                <NavLink to={`/creator/${profile.username !== 'null' ? profile.username : profile._id}/new`}>Create New <span><MdOutlineVideoFile /></span></NavLink>
                                                     </div>
                                             </div>

                                             <div className="assets-videos">
                                                        <h4>{assets.length} Assets</h4>

                                                        <div className="assets-video-row">
                                                                   { assets.map(item => 
                                                                        <div className="asset-video-moja" key={item._id} onClick={() => openVideoModal(item._id)} >
                                                                              <img src={item.asset.thumbnail} alt="" />
                                                                              <div className="video-deets">
                                                                                         <div className="video-tags">
                                                                                                   <h3>{item.created_for}</h3>
                                                                                                   <p>{item.brand_product}</p>
                                                                                         </div>
                                                                                         <div className="likes">
                                                                                                     <span><FaHeart /></span>
                                                                                                     <p>0</p>
                                                                                         </div>
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

export default AssetsBody