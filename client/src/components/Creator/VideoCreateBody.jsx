import { useSelector } from "react-redux"
import Topbar from "./Topbar"
import { useDropzone } from "react-dropzone"
 import { BsUpload } from "react-icons/bs"
import { useState } from "react"
import  { useForm } from "react-hook-form"
import { AiOutlineDelete } from 'react-icons/ai'
import Footer from "../Footer"
import VideoLoader from "./VideoLoader"
import { useCreateAssetMutation } from "../../redux/videosSlice"
import { toast } from "react-hot-toast"
const VideoCreateBody = () => {
    const { profile } = useSelector(state => state.profile)
    const { videoUploadProgress } = useSelector(state => state.utils)
    const { userBrands } = useSelector(state => state.utils)
    const [isUploading, setIsUploading] = useState(false);
   const [ selectedFile, setSelectedFile] = useState(null)
   const { register, formState:{ errors }, handleSubmit, setValue,reset, resetField } = useForm()
    //Video dropzone
    const { getRootProps, getInputProps } = useDropzone({
            accept: {
                  'video/*': ['.mp4']
            },
            onDrop: (files) => {
                      setValue('video', files);
                      setSelectedFile(files)
            }
    })

    const [ createAsset, { isLoading } ] = useCreateAssetMutation();

    const uploadAsset = async(data, e) =>{
            e.preventDefault();
            const formData = new FormData();
            formData.append('data', JSON.stringify(data));
            formData.append('userVideo', data.video[0]);

            setIsUploading(true);
            try {
                   const response = await createAsset(formData).unwrap();
                   
                   if(response) {
                          console.log(response)
                          reset();
                          resetUpload();
                   }
                    

            } catch (error) {
                  console.log(error);
                  toast.error("Asset Creation Failed. Internal server error", { id: 'asset creation error'})
            }
      
    }
    const resetUpload = () => {
            setSelectedFile(null)
            resetField('video')
    }
  return (
    <div  className="dashboard-body-wrap">
               
               <div className="dashboard-row">
                          <Topbar user={profile} />

                          <div className="video-create-row">
                                       <div className="video-header">
                                                 <h2>Create a New Asset</h2>
                                                 <p>Easily upload your video asset, tag a specific brand you&apos;d like to create for. Then sit back and relax. You&apos;re one step away from financial freedom.</p>
                                       </div>
                                      
                                       { isUploading ?
                                             <VideoLoader percent={videoUploadProgress} uploadStatus={isLoading} resetIsUploading={setIsUploading} />
                                           : 
                                           <form onSubmit={handleSubmit(uploadAsset)} encType="multipart/form-data">
                                                     <div className="video-form-row">
                                                                 <div className="video-form-column">
                                                                            <label htmlFor="brand">Choose a Brand</label>
                                                                            <select className="video-form-control" {...register('brand', { required: 'Please specify the brand you are creating for'})}>
                                                                                       <option value=''>My Brands</option>
                                                                                       {userBrands && userBrands.length > 0 ?
                                                                                                 userBrands.map(item => 
                                                                                                        <option key={item._id} value={item.name}>{item.name}</option>
                                                                                                  )
                                                                                                 :
                                                                                                 <option value="">Please add a Brand</option>
                                                                                        }
                                                                                      
                                                                            </select>
                                                                            <span>{errors.brand && errors.brand.message}</span>
                                                                 </div>
                                                                  <div className="video-form-column">
                                                                               <label htmlFor="product">Specify Product</label>
                                                                               <input type="text" className="video-form-control" placeholder="Brand product" {...register('product')} />
                                                                  </div>
                                                      </div>
                                      
                                                     { selectedFile ?
                                                            <div className="upload-status">
                                                                    <p>You are about to upload the file below:</p>

                                                                    <div className="upload-status-box">
                                                                               <p>{selectedFile[0].path}</p>
                                                                               <span onClick={resetUpload}><AiOutlineDelete /></span>
                                                                    </div>
                                                            </div>
                                                              :
                                                          <div className="video-upload-part">
                                                                   <label htmlFor="video upload">Upload Video</label>

                                                                   <div className="video-upload-trigger-box">
                                                                              <div { ...getRootProps() } className="upload-wrapper">
                                                                                          <input {...getInputProps} className="dropbox"  name="video"  {...register('video', {required: 'Please upload a video'})}  />
                                                                                          <span><BsUpload /></span>
                                                                                          <p>Drop files here or click to upload</p>
                                                                              </div>
                                                                              <span className="error">{errors.video && errors.video.message}</span>
                                                                   </div>                                                      
                                                            </div>
                                                       }

                                                     <div className="video-form-column">
                                                                 <label htmlFor="caption">Add a Caption</label>
                                                                 <textarea name="" placeholder="Add a caption to go with it" cols="30" rows="10" {...register('caption')}></textarea>
                                                     </div>

                                                       <button type="submit">Create your asset</button>
                                           </form>
                                      }
                          </div>
               </div>
               <Footer />
    </div>
  )
}

export default VideoCreateBody

