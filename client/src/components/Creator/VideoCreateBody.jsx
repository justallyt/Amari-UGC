import { useSelector } from "react-redux"
import Topbar from "./Topbar"
import { useDropzone } from "react-dropzone"
 import { BsUpload } from "react-icons/bs"

const VideoCreateBody = () => {
    const { profile } = useSelector(state => state.profile)

    //Video dropzone
    const { getRootProps, getInputProps } = useDropzone()
  return (
    <div  className="dashboard-body-wrap">
               <div className="dashboard-row">
                          <Topbar user={profile} />

                          <div className="video-create-row">
                                       <div className="video-header">
                                                 <h2>Create a New Asset</h2>
                                                 <p>Easily upload your video asset, tag a specific brand you&apos;d like to create for. Then sit back and relax. You&apos;re one step away from financial freedom.</p>
                                       </div>
                                       <form>
                                                   <div className="video-form-row">
                                                               <div className="video-form-column">
                                                                          <label htmlFor="brand">Choose a Brand</label>
                                                                          <select className="video-form-control">
                                                                                     <option>My Brands</option>
                                                                                     <option value="Twiga Foods">Twiga Foods</option>
                                                                                     <option value="Sheth Naturals">Sheth Naturals</option>
                                                                                     <option value="Porsche Cayane">Porsche Cayane</option>
                                                                                     <option value="HoneyCoin">HoneyCoin</option>
                                                                          </select>
                                                               </div>
                                                               <div className="video-form-column">
                                                                            <label htmlFor="product">Specify Product</label>
                                                                            <input type="text" className="video-form-control" placeholder="Brand product" />
                                                               </div>
                                                   </div>
                                                   <div className="video-upload-part">
                                                                <label htmlFor="video upload">Upload Video</label>

                                                                <div className="video-upload-trigger-box">
                                                                           <div { ...getRootProps() } className="upload-wrapper">
                                                                                       <input {...getInputProps} className="dropbox" readOnly />
                                                                                       <span><BsUpload /></span>
                                                                                       <p>Drop files here or click to upload</p>
                                                                           </div>
                                                                </div>
                                                   </div>
                                       </form>
                          </div>
               </div>
    </div>
  )
}

export default VideoCreateBody