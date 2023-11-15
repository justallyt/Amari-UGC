import vid from "../../assets/vid3.jpg"
import { FaPlay } from "react-icons/fa6";
const BrandAssetsBody = () => {
  return (
    <div className="brand-asset-body">
              <div className="brand-asset-intro">
                        <h2>All Brand Assets</h2>
                       <p>View all assets created for your brand</p>          
              </div>

              <div className="brand-assets-row">
                          <div className="brand-asset-moja">
                                    <img src={vid} alt="" />
                                    <div className="play-btn">
                                                 <span><FaPlay /></span>
                                    </div>
                                    <div className="asset-details">
                                              <h3>Creator Name</h3>
                                              <p>product</p>
                                    </div>
                          </div>
                          <div className="brand-asset-moja">
                                    <img src={vid} alt="" />
                                    <div className="play-btn">
                                                 <span><FaPlay /></span>
                                    </div>
                                    <div className="asset-details">
                                              <h3>Creator Name</h3>
                                              <p>product</p>
                                    </div>
                          </div>
                          <div className="brand-asset-moja">
                                    <img src={vid} alt="" />
                                    <div className="play-btn">
                                                 <span><FaPlay /></span>
                                    </div>
                                    <div className="asset-details">
                                              <h3>Creator Name</h3>
                                              <p>product</p>
                                    </div>
                          </div>
                          <div className="brand-asset-moja">
                                    <img src={vid} alt="" />
                                    <div className="play-btn">
                                                 <span><FaPlay /></span>
                                    </div>
                                    <div className="asset-details">
                                              <h3>Creator Name</h3>
                                              <p>product</p>
                                    </div>
                          </div>
                          <div className="brand-asset-moja">
                                    <img src={vid} alt="" />
                                    <div className="play-btn">
                                                 <span><FaPlay /></span>
                                    </div>
                                    <div className="asset-details">
                                              <h3>Creator Name</h3>
                                              <p>product</p>
                                    </div>
                          </div>
              </div>
    </div>
  )
}

export default BrandAssetsBody