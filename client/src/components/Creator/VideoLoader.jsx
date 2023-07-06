import { useState } from "react"
import { GiCheckMark } from "react-icons/gi"
const VideoLoader = () => {
    const [success, setSuccess] = useState(false)
    const [ tick, setTick] = useState(false)
  return (
    <div className="video-loading-section">
                <div className="video-section-box">
                             { success ? 
                                     <div className="success-part">
                                           <div className="success-circle">
                                                      <span><GiCheckMark /></span>
                                                      <div className={success ? "overlay active" : 'overlay'}></div>
                                           </div>
                                           <p>Asset Uploaded Successfully</p>
                                  </div>
                             :
                              <>
                                        <div className="bouncing-things">
                                                     <div className="bouncing-box"></div>
                                                    <div className="bouncing-shadow"></div>
                                        </div>
                                        <p>Uploading your asset</p>           
                                         <div className="progress-bar">
                                                   <div className="bar-percent"></div>
                                         </div>
                               </>
                             }
                </div>
    </div>
  )
}

export default VideoLoader