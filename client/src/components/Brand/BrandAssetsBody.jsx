//import vid from "../../assets/vid3.jpg"
import { FaPlay } from "react-icons/fa6";
import { useDispatch, useSelector} from "react-redux"
import BrandAssetModal from "./BrandAssetModal";
import { openBrandModal } from "../../redux/brand/brandUtils";
import { useState } from "react";
const BrandAssetsBody = () => {
  const { brandAssets } = useSelector(state => state.brand)
  const [assetDetails, setAssetDetails]  = useState();
  const { isBrandAssetModalOpen } = useSelector(state => state.brand)

  const dispatch = useDispatch();

  const openAssetModal = (asset) => {
          setAssetDetails(asset)
          dispatch(openBrandModal());
  }

  return (
    <div className="brand-asset-body">
              <div className="brand-asset-intro">
                        <h2>All Brand Assets</h2>
                       <p>View all assets created for your brand</p>          
              </div>
               { isBrandAssetModalOpen && <BrandAssetModal data={assetDetails} func={setAssetDetails} />}
              <div className="brand-assets-row">
                        { brandAssets && brandAssets.length > 0 ?
                                 brandAssets.map(kitu => 
                                      <div className="brand-asset-moja" key={kitu._id} onClick={() => openAssetModal(kitu)}>
                                            <img src={kitu.asset.thumbnail} alt="" />
                                            <div className="asset-overlay"></div>
                                            <div className="play-btn">
                                                         <span><FaPlay /></span>
                                            </div>
                                            <div className="asset-details">
                                                      <h3>{kitu.brand_product}</h3>
                                                      <p>{kitu.caption}</p>
                                            </div>
                                    </div>
                                  )
                             :
                              <p>No Assets has yet been created for your brand</p>
                         }
                         
              </div>
    </div>
  )
}

export default BrandAssetsBody