import { IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { closeBrandModal } from "../../redux/brand/brandUtils";
import BrandOpenedAsset from "./BrandOpenedAsset";

const BrandAssetModal = ({ data }) => {
  const { isBrandAssetModalOpen } = useSelector(state => state.brand)
  const dispatch = useDispatch();

  const closeModal = () => {
            dispatch(closeBrandModal())
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
                                    <span onClick={closeModal}><IoCloseOutline /></span>
                                   <div className="modal-texts-inner">
                                              <h3>Creator</h3>
                                              <div className="creator-profile">
                                                       <div className="profile-image">
                                                               <img src="" alt="" />
                                                       </div>
                                                       <div className="profile-texts">
                                                                 <h4>Abigail Bundi</h4>
                                                                 <p>@abigail</p>
                                                       </div>
                                              </div>
                                   </div>
                        </div>
            </div>
    </div>
  )
}

export default BrandAssetModal