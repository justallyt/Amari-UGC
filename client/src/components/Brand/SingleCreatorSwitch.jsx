import { useContext, useEffect, useState } from "react"
import { divSwitch } from "./context/divswitch"
import { TbSquareRoundedArrowLeftFilled } from "react-icons/tb";
import { useGetAllAssetsByACreatorQuery } from "../../redux/brand/brandSlice";
import SpinnerData from "../SpinnerData";
import { useDispatch, useSelector } from "react-redux";
import { clearCreator, openBrandModal, setSingleCreator } from "../../redux/brand/brandUtils"
import { FaPlay } from "react-icons/fa6";
import BrandAssetModal from "./BrandAssetModal";

const SingleCreatorSwitch = () => {
    const [switchStatus, setSwitchStatus] = useContext(divSwitch);
    const { singleCreator, isBrandAssetModalOpen } = useSelector(state => state.brand)
    const [assetDetails, setAssetDetails] = useState();
   const dispatch = useDispatch();
    const deactiveCreator = () =>{
        setSwitchStatus({ status: false, data: {}, })
        dispatch(clearCreator())
    } 

    //fetch creator assets
    const creator_id = Object.keys(switchStatus.data).length > 0 ? switchStatus.data._id : ''

    const { data, isLoading } = useGetAllAssetsByACreatorQuery(creator_id)

    useEffect(() => {
            if(data){
                   dispatch(setSingleCreator(data.assets))
            }
    }, [data, dispatch])
    

    //open asset
    const openAssetModal = (asset) => {
            setAssetDetails(asset);
            dispatch(openBrandModal())
    }
   
  return (
    <div className={switchStatus.status ? "single-creator-swatch moved" : "single-creator-swatch"}>
                <h3 className="back-btn" onClick={deactiveCreator}> <span><TbSquareRoundedArrowLeftFilled /></span>Back</h3>

                <div className="single-creator-profile">
                             <div className="image">
                                         <img src={Object.keys(switchStatus.data).length > 0 && switchStatus.data.profilePic.url !== null ? switchStatus.data.profilePic.url : ''} alt="" />
                             </div>
                             <div className="single-profile-texts">
                                      <h2>{Object.keys(switchStatus.data).length > 0 && switchStatus.data.name}</h2>
                                      <p>@{Object.keys(switchStatus.data).length > 0 && switchStatus.data.username ? switchStatus.data.username : 'username-null'}</p>
                             </div>
                </div>                
                        {   isLoading ? 
                                  <div className="spinning-and-get-data">
                                            <SpinnerData />
                                  </div> 
                                   : 
                                   <>
                                            {  singleCreator && singleCreator.length > 0 ? 
                                                    <div className="brand-assets-row">
                                                               { singleCreator.map(item => 
                                                                      <div className="brand-asset-moja" key={item._id} onClick={() => openAssetModal(item)}>
                                                                                <img src={item.asset.thumbnail} alt="" />
                                                                                <div className="asset-overlay"></div>
                                                                                <div className="play-btn">
                                                                                             <span><FaPlay /></span>
                                                                                </div>
                                                                                <div className="asset-details">
                                                                                          <h3>{item.brand_product}</h3>
                                                                                          <p>{item.caption}</p>
                                                                                </div>
                                                                     </div>
                                                                 )}
                                                    </div>
                                             :
                                                 <p className="fail">This creator is has not created an asset for your brand yet.</p>
                                             }
                                   </>
                             }

                      { isBrandAssetModalOpen && <BrandAssetModal  data={assetDetails} func={setAssetDetails} />}  
    </div>
  )
}

export default SingleCreatorSwitch