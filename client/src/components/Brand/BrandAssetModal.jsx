import { IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { closeBrandModal, setBrandAssets } from "../../redux/brand/brandUtils";
import BrandOpenedAsset from "./BrandOpenedAsset";
import profileImg from "../../assets/dummyprofile.png"
import { GoHeart, GoBookmark, GoHeartFill } from "react-icons/go";
import { useLikeUserAssetMutation } from "../../redux/assetSlice";
import { useState } from "react";

const BrandAssetModal = ({ data }) => {
  const [ likeFlag, setLikeFlag] = useState(true);
  const { isBrandAssetModalOpen, brandCreators } = useSelector(state => state.brand)
  const { profile } = useSelector(state => state.profile)
  const dispatch = useDispatch();

  const closeModal = () => {
            dispatch(closeBrandModal())
  }

  //get asset creator
  const creator = brandCreators && data ? brandCreators.find(item => item._id === data.creator) : {}
  //const likeStatus = data && data.is_liked.length > 0 ? data.is_liked[0].is_liked : false
 const [LikeUserAsset] = useLikeUserAssetMutation();
 
  const likeCreatedAsset = async(id) => {
       
         const info = {
                   asset_id: data ? data._id : '',
                   brand_id: id
         }
          const result = await LikeUserAsset(info).unwrap();

          if(result){
                dispatch(setBrandAssets([...result]))
          }
  }
  
  return (
    <div className={isBrandAssetModalOpen ? "brand-modal active" : "brand-modal"}>
            <div className="brand-modal-content">
                        <div className="brand-modal-asset-col">
                                   <div className="modal-asset-body">
                                                <div className="modal-loader"></div>
                                               <BrandOpenedAsset source={data ? data.asset.url : ''}  status={isBrandAssetModalOpen}/>
                                   </div>
                        </div>
                        <div className="brand-modal-texts-col">
                                    <span className="modal-close" onClick={closeModal}><IoCloseOutline /></span>
                                   <div className="modal-texts-inner">
                                              <h3>Creator</h3>
                                              { Object.keys(creator).length > 0 &&
                                                      <div className="creator-profile">
                                                             <div className="profile-image">
                                                                     <img src={creator.profilePic.url !== 'null' ? creator.profilePic.url : profileImg} alt="" />
                                                             </div>
                                                             <div className="profile-texts">
                                                                       <h4>{creator.name}</h4>
                                                                       <p>@{creator.username}</p>
                                                             </div>
                                                    </div>      
                                             }
                                             <div className="asset-product-row">
                                                       <span>Product</span>
                                                       <h5>{data && data.brand_product}</h5>
                                              </div>
                                              <p className="caption">{data && data.caption}</p>

                                              <div className="impressions-part">
                                                        <div className="like-option" onClick={() => likeCreatedAsset(profile._id)}>
                                                                  <span className={data && data.liked_by.length > 0 && data.liked_by[0].is_liked ? 'active' : ''}>
                                                                                {data && data.liked_by.length > 0 && data.liked_by[0].is_liked ? <GoHeartFill />   : <GoHeart />}
                                                                  </span>
                                                        </div>
                                                        <div className="bookmark-option">
                                                                  <span><GoBookmark /></span>
                                                        </div>
                                              </div>
                                   </div>
                        </div>
            </div>
    </div>
  )
}

export default BrandAssetModal