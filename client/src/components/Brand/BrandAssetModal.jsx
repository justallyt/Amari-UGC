import { IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { closeBrandModal, setBrandAssets } from "../../redux/brand/brandUtils";
import BrandOpenedAsset from "./BrandOpenedAsset";
import profileImg from "../../assets/dummyprofile.png"
import { GoHeart, GoBookmark, GoHeartFill,GoBookmarkFill, GoDownload } from "react-icons/go";
import { useBookmarkUserAssetMutation, useCommentOnAssetMutation, useGetAssetCommentsQuery, useLikeUserAssetMutation } from "../../redux/assetSlice";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast"
import JsFileDownloader from "js-file-downloader"
import CommentMoja from "./CommentMoja";


const BrandAssetModal = ({ data, func }) => {
  const [likeFlag, setLikeFlag] = useState(false);
  const [bookmarkFlag, setBookmarkFlag] = useState(false)
  const [commentMoja, setCommentMoja] = useState('')
  const [isAbleToPost, setIsAbleToPost] = useState(false)
  const [isCreatingComment, setIsCreatingComment] = useState(false);
  const { isBrandAssetModalOpen, brandCreators } = useSelector(state => state.brand)
  const { profile } = useSelector(state => state.profile)
  const dispatch = useDispatch();
  const commentRef = useRef();

  const closeModal = () => {
            dispatch(closeBrandModal());
            setLikeFlag(false);
            setBookmarkFlag(false)
  }

  //get asset creator
  const creator = brandCreators && data ? brandCreators.find(item => item._id === data.creator) : {}

 const [LikeUserAsset] = useLikeUserAssetMutation();
 const [bookmarkUserAsset] = useBookmarkUserAssetMutation();

 useEffect(() => {
        if(data && data.liked_by.length > 0){
                setLikeFlag(true)
        }

        if(data && data.bookmarked){
                setBookmarkFlag(true)
        }

 }, [data])

 //Like asset
  const likeCreatedAsset = async(id) => {
        if(data && data.liked_by.length > 0 && likeFlag){
                 setLikeFlag(false)
        }
        if(data && data.liked_by.length === 0){
                setLikeFlag(true)
        }
       
         const info = {
                   asset_id: data ? data._id : '',
                   brand_id: id
         }
          const result = await LikeUserAsset(info).unwrap();
         
          if(result){
                dispatch(setBrandAssets([...result.data]))
                func(result.asset)
          }
  }
  
  //bookmark asset
  const bookmarkAsset = async() => {
          if(data && data.bookmarked && bookmarkFlag){
                setBookmarkFlag(false)
          }
          if(data && data.bookmarked === false){
                 setBookmarkFlag(true)
          }
          const id = data ? { asset_id: data._id} : {}
          const result = await bookmarkUserAsset(id).unwrap();

          if(result){
                   dispatch(setBrandAssets([...result.data]))
                   func(result.asset)
          }
  }

  //Asset url
  const file_url = data ? data.asset.url : ''
  const DownloadFile = () => {
          new JsFileDownloader({
                   url: file_url
          }).then(() => {
                  toast.success('Asset download successful', { id: 'download-status'})
          }).catch(error => {
                  console.log(error)
                  toast.error('Asset download failed', { id: 'error'})
          })
  }
  
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
                   asset: data ? data._id : '',
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
  const asset_id = data ? data._id : ''
  const { data: comments, isLoading } = useGetAssetCommentsQuery(asset_id);
  
  return (
    <div className={isBrandAssetModalOpen ? "brand-modal active" : "brand-modal"}>
           <Toaster />
            <div className="brand-modal-content">
                        <div className="brand-modal-asset-col">
                                   <div className="modal-asset-body">
                                                <div className="modal-loader"></div>
                                               <BrandOpenedAsset source={data ? data.asset.url : ''}  status={isBrandAssetModalOpen}/>
                                   </div>
                        </div>
                        <div className="brand-modal-texts-col">
                                    <span className="modal-close" onClick={closeModal}><IoCloseOutline /></span>
                                     <div className="modal-texts-inner">
                                              <h3>Creator</h3>
                                              { Object.keys(creator).length > 0 &&
                                                      <div className="creator-profile">
                                                             <div className="profile-image">
                                                                     <img src={creator.profilePic.url !== 'null' ? creator.profilePic.url : profileImg} alt="" />
                                                             </div>
                                                             <div className="profile-texts">
                                                                       <h4>{creator.name}</h4>
                                                                       <p>@{creator.username}</p>
                                                             </div>
                                                    </div>      
                                             }
                                             <div className="asset-product-row">
                                                       <span>Product</span>
                                                       <h5>{data && data.brand_product}</h5>
                                              </div>
                                              <p className="caption">{data && data.caption}</p>

                                              <div className="impressions-part">
                                                        <div className="like-option" onClick={() => likeCreatedAsset(profile._id)} title="Like Asset">
                                                                  <span className={likeFlag  ? 'active' : ''}>
                                                                                { likeFlag ? <GoHeartFill />   : <GoHeart />}
                                                                  </span>
                                                        </div>
                                                        <div className="right-col">
                                                                   <div className="bookmark-option" onClick={bookmarkAsset} title="Bookmark Asset">
                                                                             <span className={bookmarkFlag ? 'active' : ''}>
                                                                         { bookmarkFlag ? <GoBookmarkFill /> : <GoBookmark /> }
                                                                            </span>
                                                                   </div>
                                                                   <div className="download-option" onClick={DownloadFile} title="Download Asset">
                                                                                  <span><GoDownload /></span>
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
                                                                                       <CommentMoja data={comment} key={comment._id}/>
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

export default BrandAssetModal