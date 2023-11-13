import { CgClose } from "react-icons/cg"
import { useDispatch, useSelector } from "react-redux"
import { closeModal } from "../../redux/utilsSlices"
import OpenedAsset from "../OpenedAsset"
import profileImg from "../../assets/dummyprofile.png"
import { TfiHeart } from "react-icons/tfi"
//import { MdOutlineSell } from "react-icons/md"
import { VscEye } from "react-icons/vsc"

const AssetModal = ({ identity }) => {
    const dispatch = useDispatch()
   const { isModalOpen, assets, userBrands } = useSelector(state => state.utils);
   const { profile } = useSelector(state => state.profile)
   
    const closeVideoModal = () =>{
           dispatch(closeModal());
    }
  
    //obtain asset clicked
    const activeAsset = assets.find(item => item._id === identity);
    //Get brand associated with asset
    const brand = userBrands !== null && userBrands.find(item => item.name === activeAsset.created_for)
  
  return (
    <div className={isModalOpen ? "video-modal-wrapper active" : "video-modal-wrapper"}>
              <span className="close-btn" onClick={closeVideoModal}><CgClose /></span>
              <div className="modal-box">
                         <div className="video-part">
                                    <div className="modal-video-box"> 
                                              <OpenedAsset source={activeAsset.asset.url} />
                                    </div>
                         </div>
                         <div className="likes-part">
                                   <div className="likes-parts-inner">
                                            <div className="creator">
                                                       <div className="creator-image">
                                                                  <img src={profile.profilePic.url !== 'null' ? profile.profilePic.url : profileImg} alt="" />
                                                       </div>
                                                       <div className="creator-profile-texts">
                                                                <h3>{profile !==null && profile.name}</h3>
                                                                <p>{profile !== null && `@${profile.username}`}</p>
                                                       </div>
                                            </div>
                                            <div className="asset-description">
                                                      <p>{ activeAsset && activeAsset.caption} </p>

                                                      <h4>Created For</h4>
                                                      <div className="asset-brand-deets">
                                                                  <div className="asset-brand-image">
                                                                            <img src={brand.profilePic.url !== 'null' ? brand.profilePic.url : profileImg} alt="Brand logo"/> 
                                                                  </div>
                                                                  <div className="brand-name-product">
                                                                              <h4>{activeAsset && activeAsset.created_for}</h4>
                                                                               <h5>Product: <span>{activeAsset && activeAsset.brand_product}</span></h5>
                                                                  </div>
                                                      </div>
                                            </div>

                                            <div className="asset-impressions">
                                                         <div className="asset-impression-column">
                                                                   <span><TfiHeart /></span>
                                                                   <h4>45</h4>
                                                         </div>
                                                         <div className="asset-impression-column">
                                                                   <span><VscEye /></span>
                                                                   <h4>145</h4>
                                                         </div>
                                                         {/* <div className="asset-impression-column">
                                                                   <span><MdOutlineSell /></span>
                                                                    <h4>Not Yet</h4>
                                                         </div> */}
                                            </div>
                                            {/* <h4>Asset Liked by</h4>
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
                                            </div> */}
                                   </div>
                         </div>
              </div>
    </div>
  )
}

export default AssetModal