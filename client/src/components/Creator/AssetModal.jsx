import { CgClose } from "react-icons/cg"
import { useDispatch, useSelector } from "react-redux"
import { closeModal } from "../../redux/utilsSlices"
import OpenedAsset from "../OpenedAsset"
import profileImg from "../../assets/dummyprofile.png"
import { useCommentOnAssetMutation, useGetAssetCommentsQuery } from "../../redux/assetSlice"
import CommentMoja from "../Brand/CommentMoja"
import { useRef, useState } from "react"
import toast, { Toaster } from "react-hot-toast"

const AssetModal = ({ identity }) => {
    const dispatch = useDispatch()
   const { isModalOpen, assets, userBrands } = useSelector(state => state.utils);
   const { profile } = useSelector(state => state.profile)
   const commentRef = useRef();
   const [commentMoja, setCommentMoja] = useState('')
   const [isAbleToPost, setIsAbleToPost] = useState(false)
   const [isCreatingComment, setIsCreatingComment] = useState(false);

    const closeVideoModal = () =>{
           dispatch(closeModal());
    }
  
    //obtain asset clicked
    const activeAsset = assets.find(item => item._id === identity);
    //Get brand associated with asset
    const brand = userBrands !== null && userBrands.find(item => item.name === activeAsset.created_for)
  

    const updatePostStatus = (comment) => {
      if(comment === ''){
             setIsAbleToPost(false);
      }else{
             setIsAbleToPost(true);
             setCommentMoja(comment)
      }
}

      //Commenting on Asset feature
  const [CreateComment] = useCommentOnAssetMutation();

  const SubmitComment = async () => {
          setIsCreatingComment(true)
           const comment_data = {
                   asset: identity ? identity : '',
                   comment: commentMoja,
                   commentor: profile._id,
                   name: profile.name,
                   photo: profile.profilePic.url
           }
          const result = await CreateComment(comment_data).unwrap();

          if(result){
                  commentRef.current.value = '';
                  setIsAbleToPost(false);
                  setIsCreatingComment(false);
          }else{
                 toast.error("Could not add your comment", { id: 'comment-error'})
          }
  }

    //Fetch Comments
    const asset_id = identity ? identity : '';
    const { data: comments, isLoading } = useGetAssetCommentsQuery(asset_id)

  return (
    <div className={isModalOpen ? "video-modal-wrapper active" : "video-modal-wrapper"}>
              <Toaster />
              <div className="modal-box">
                         <div className="video-part">
                                    <div className="modal-video-box"> 
                                               <div className="modal-loader"></div>
                                              <OpenedAsset source={activeAsset.asset.url} />
                                    </div>
                         </div>
                         <div className="likes-part"> 
                               <span className="close-btn" onClick={closeVideoModal}><CgClose /></span>
                                   <div className="likes-parts-inner">
                                            <div className="creator">
                                                       <div className="creator-image">
                                                                  <img src={profile.profilePic.url !== 'null' ? profile.profilePic.url : profileImg} alt="" />
                                                       </div>
                                                       <div className="creator-profile-texts">
                                                                <h3>{profile !==null && profile.name}</h3>
                                                                <p>{profile !== null && `@${profile.username}`}</p>
                                                       </div>
                                            </div>
                                            <div className="asset-description">
                                                      <p>{ activeAsset && activeAsset.caption} </p>

                                                      <h4>Created For</h4>
                                                      <div className="asset-brand-deets">
                                                                  <div className="asset-brand-image">
                                                                            <img src={brand.profilePic.url !== 'null' ? brand.profilePic.url : profileImg} alt="Brand logo"/> 
                                                                  </div>
                                                                  <div className="brand-name-product">
                                                                              <h4>{activeAsset && activeAsset.created_for}</h4>
                                                                               <h5>Product: <span>{activeAsset && activeAsset.brand_product}</span></h5>
                                                                  </div>
                                                      </div>
                                            </div>

                                            <div className="comments-wrapper">
                                                       <h4>Comments</h4>

                                                       <div className="comments-body">
                                                                    { !comments && !isLoading  && <p className="error">Error fetching comments</p>}
                                                                     { isLoading  ?
                                                                           <div className="simple-loader">
                                                                                    <span className="spinning-loader"></span>
                                                                            </div>
                                                                            : 
                                                                            comments.length > 0 ?
                                                                                   comments.map(comment => 
                                                                                          <CommentMoja data={comment} key={comment._id} />
                                                                                    )
                                                                                    :
                                                                                    <p className="error">No Comments yet</p>                            
                                                                     }
                                                       </div>
                                            </div>
                                   </div>
                                   <div className="comment-input">
                                              <textarea placeholder="Add your comment" cols="30" rows="10" onChange={e =>updatePostStatus(e.target.value)} ref={commentRef} ></textarea>
                                               <h3 className={ isAbleToPost ? 'active': ''} onClick={SubmitComment}>
                                                        { isCreatingComment ? <span className="spinning-loader"></span> : 'Post'}
                                               </h3>
                                   </div>
                         </div>
              </div>
    </div>
  )
}

export default AssetModal