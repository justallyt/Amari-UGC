/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { GiCheckMark } from "react-icons/gi"
import { useDispatch, useSelector } from "react-redux"
import { clearUploadProgress } from "../../redux/utilsSlices"
import { NavLink } from "react-router-dom"
const VideoLoader = ({ percent, uploadStatus, resetIsUploading }) => {
    const [success, setSuccess] = useState(false)
    const [uploadMsg, setUploadMsg] = useState("Retrieving and preparing your asset")
    const { profile } = useSelector(state => state.profile)
  //  useEffect(()=> {
  //         if(percent === 100){
  //                  setTimeout(()=> {
  //                      setUploadMsg("Uploading your asset to the servers")
  //                  }, 1000)
  //         }

  //        if(!uploadStatus){
  //                setSuccess(true)
  //         }
  //  }, [percent, uploadStatus])

   const dispatch = useDispatch()
   const resetThings = () => {
            setSuccess(false);
            setUploadMsg("Retrieving and preparing your asset");
            dispatch(clearUploadProgress());
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
                                                       <NavLink to={'/'} onClick={resetThings}>View Asset</NavLink>
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
                                         <div className="progress-bar">
                                                   <div className="bar-percent" style={{ width: `${percent}%` }}></div>
                                         </div>
                               </>
                             }
                </div>
    </div>
  )
}

export default VideoLoader