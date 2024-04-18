import { useDispatch, useSelector } from "react-redux"
import Topbar from "./Topbar"
import { NavLink } from "react-router-dom"
import { MdOutlineVideoFile } from "react-icons/md"
import AssetModal from "./AssetModal"
import {  openModal, setUserAssets } from "../../redux/utilsSlices"
import { VscHeart } from "react-icons/vsc"
import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react"
import Footer from "../Footer"
import { useGetUserAssetsQuery } from "../../redux/assetSlice"

const AssetsBody = () => {
      const [videoId, setVideoId] = useState(null)
    const { profile } = useSelector(state => state.profile)
    const { assets, isModalOpen } = useSelector(state => state.utils);
    const { data: pulled_assets } = useGetUserAssetsQuery({ refetchOnMountOrArgChange: true })
    const dispatch = useDispatch();

    const openVideoModal = (id) => {
          dispatch(openModal())
          setVideoId(id)
    }

    useEffect(() => {
             if(pulled_assets){
                   dispatch(setUserAssets([...pulled_assets.assets]))
             }
    }, [dispatch, pulled_assets])


       return (
            <div className="dashboard-body-wrap">
                       <div className="dashboard-row">
                                  <Topbar user={profile} />
                                 { isModalOpen ? <AssetModal identity={videoId} /> : ''}
                                  <div className="assets-body-wrap">
                                             <div className="intro-header">
                                                     <h2>My Brand Moments</h2>
                                                     <div className="intro-column">
                                                                <p>View and manage all the brand moments that you have created so far</p>
                                                                <NavLink to={`/creator/${profile.username !== 'null' ? profile.username : profile._id}/new`}>Create New <span><MdOutlineVideoFile /></span></NavLink>
                                                     </div>
                                             </div>

                                             <div className="assets-videos">
                                                        <h4>{assets !== null && `${assets.length} Assets`}</h4>

                                                        { assets !== null && assets.length > 0 ?
                                                              <div className="assets-video-row">
                                                                   { assets !== null &&  assets.map(item => 
                                                                        <div className="asset-video-moja" key={item._id} onClick={() => openVideoModal(item._id)} >
                                                                              <img src={item.asset.thumbnail} alt="" />
                                                                              <div className="video-deets">
                                                                                         <div className="video-tags">
                                                                                                   <h3>{item.created_for}</h3>
                                                                                                   <p>{item.brand_product}</p>
                                                                                         </div>
                                                                                         <div className="likes">
                                                                                                { item.liked_by.length > 0 ?
                                                                                                      <span className="liked"><FaHeart /></span>
                                                                                                 :
                                                                                                      <span><VscHeart /></span>
                                                                                                 }
                                                                                                     
                                                                                                    
                                                                                         </div>
                                                                              </div>
                                                                   </div>
                                                                  )}
                                                        </div>     : <p className="silence">You have not created any assets so far.</p>
                                                        }
                                             </div>
                                  </div>

                                  <Footer />
                       </div>
            </div>
       )
}

export default AssetsBody