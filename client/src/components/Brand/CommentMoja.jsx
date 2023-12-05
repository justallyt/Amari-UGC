import { useSelector } from "react-redux"
import ReplyForm from "./ReplyForm";
import { useState } from "react";
import ReplyMoja from "./ReplyMoja";

const CommentMoja = () => {
     const [replyStatus, setReplyStatus] = useState(false)
    const { profile } = useSelector(state => state.profile)
  return (
    <div className="comment-moja">
              <div className="main-comment">
                    <div className="comment-image-profile">
                                <img src={profile.profilePic.url} alt="image" />
                    </div>
                     <div className="author-texts">
                              <h5>CocaCola</h5>
                              <p>Well this is a beautiful artwork. keep on doing great work</p>
                              <div className="author-actions">
                                        <span>3 days ago</span>
                                          <h6 onClick={() => setReplyStatus(!replyStatus)}>Reply</h6>
                              </div>
                               <ReplyForm  status={replyStatus} func={setReplyStatus} />
                               <div className="replies-body">
                                           <ReplyMoja />
                               </div>
                   </div>
       </div>
</div>
  )
}

export default CommentMoja