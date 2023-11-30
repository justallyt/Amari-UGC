import { useSelector } from "react-redux"
import ReplyForm from "./ReplyForm";
import { useState } from "react";

const CommentMoja = () => {
     const [replyStatus, setReplyStatus] = useState(false)
    const { profile } = useSelector(state => state.profile)
  return (
    <div className="comment-moja">
              <div className="main-comment">
                     <img src={profile.profilePic.url} alt="image" />
                     <div className="author-texts">
                              <h5>CocaCola</h5>
                              <p>Well this is a beautiful artwork. keep on doing great work</p>
                              <div className="author-actions">
                                        <span>3days ago</span>
                                          <h6 onClick={() => setReplyStatus(true)}>Reply</h6>
                              </div>
                               <ReplyForm  status={replyStatus} func={setReplyStatus} />
                   </div>
       </div>
</div>
  )
}

export default CommentMoja