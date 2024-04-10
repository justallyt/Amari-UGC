/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { GiCheckMark } from "react-icons/gi"
import { useSelector } from "react-redux"

import { NavLink } from "react-router-dom"
const VideoLoader = ({ resetIsUploading, end, resetIsFinished }) => {
    const [success, setSuccess] = useState(false)
    const [uploadMsg, setUploadMsg] = useState("Sit tight while we upload your asset.")
    const { profile } = useSelector(state => state.profile)

   useEffect(()=> {
         if(end){
                 setSuccess(true)
          }
   }, [end])

   const resetThings = () => {
            setSuccess(false);
            setUploadMsg("Sit tight while we upload your asset.");
            resetIsFinished(false)
            resetIsUploading(false)
   }
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

                                           <div className="asset-btns">
                                                       <NavLink to={`/creator/${profile.username !== 'null' ? profile.username : profile._id}/moments`} onClick={resetThings}>View Asset</NavLink>
                                                       <NavLink to={`/creator/${profile.username !== 'null' ? profile.username : profile._id}/new`} onClick={resetThings}>Create Another</NavLink>
                                           </div>
                                  </div>
                             :
                              <>
                                        <div className="bouncing-things">
                                                     <div className="bouncing-box"></div>
                                                    <div className="bouncing-shadow"></div>
                                        </div>
                                        <p>{uploadMsg}</p>           
                               </>
                             }
                </div>
    </div>
  )
}

export default VideoLoader