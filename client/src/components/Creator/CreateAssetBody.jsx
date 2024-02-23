import { useSelector } from "react-redux"
import Topbar from "./Topbar"
import { useDropzone } from "react-dropzone"
 import { BsUpload } from "react-icons/bs"
import { useState } from "react"
import  { useForm } from "react-hook-form"
import { AiOutlineDelete } from 'react-icons/ai'
import Footer from "../Footer"
import VideoLoader from "./VideoLoader"
// import { useCreateAssetMutation } from "../../redux/videosSlice"
import { toast } from "react-hot-toast"
import axios from "axios"
//import { useCreateAssetMutation } from "../../redux/assetSlice"

const CreateAssetBody = () => {
    const { profile } = useSelector(state => state.profile)
    const { userBrands } = useSelector(state => state.utils)
    const [isUploading, setIsUploading] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    //const [progress, setProgress] = useState(0)
   const [ selectedFile, setSelectedFile] = useState(null)
   const { register, formState:{ errors }, handleSubmit, setValue,reset, resetField } = useForm()
    //asset dropzone
    const { getRootProps, getInputProps, open } = useDropzone({
            accept: {
                  'video/*': ['.mp4'],
                  'image/*': ['.png', '.jpg', '.jpeg']
            },
            onDrop: (files) => {
                      setValue('asset', files);
                      setSelectedFile(files)
            }
    })

    //const [createUserAsset] = useCreateAssetMutation()
    const uploadAsset = async(data, e) =>{
            e.preventDefault();
            setIsUploading(true);
            const formData = new FormData();
            formData.append('data', JSON.stringify(data));
            formData.append('asset', data.asset[0]);

            // const onUploadProgress = event => {
            //        const percentCompleted = Math.round((event.loaded * 100) / event.total);
            //        console.log('onUploadProgress', percentCompleted);
            // };

            const res = await axios.post(import.meta.env.VITE_API_URL,
                   formData,
                   { withCredentials: true, headers: {"Content-Type": 'multipart/form-data' } },
             )
            // const res = await createUserAsset(formData).unwrap();

             if(res){
                   setIsFinished(true)
                   resetUpload();
             }else{
                   toast.error("Sorry something went wrong")
             }
  
            reset();
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
                                             <VideoLoader uploadStatus={isUploading} end={isFinished} resetIsFinished={setIsFinished}  resetIsUploading={setIsUploading} />
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
                                                                   <label htmlFor="video upload">Upload Asset</label>

                                                                   <div className="video-upload-trigger-box">
                                                                              <div { ...getRootProps() } className="upload-wrapper">
                                                                                          <input {...getInputProps} className="dropbox"  name="asset"  {...register('asset', {required: 'Please upload a video'})}  />
                                                                                          <span><BsUpload /></span>
                                                                                          <p>Drop files here or click to upload</p>
                                                                              </div>
                                                                              <span className="error">{errors.asset && errors.asset.message}</span>
                                                                   </div>   

                                                                   <div className="mobile-upload-trigger-box" onTouchEnd={open}>
                                                                                <span><BsUpload /></span>
                                                                                <p>Click to upload</p>
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

                          <Footer />
               </div>
               
    </div>
  )
}

export default CreateAssetBody

