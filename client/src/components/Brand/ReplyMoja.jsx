import { useSelector } from "react-redux"
import ReplyForm from "./ReplyForm";
import { useState } from "react";

const ReplyMoja = () => {
    const [replyStatus, setReplyStatus] = useState(false)
    const { profile } = useSelector(state => state.profile)
  return (
          <div className="reply-moja">
                  <div className="reply-profile">
                              <div className="comment-image-profile">
                                          <img src={profile.profilePic.url} alt="reply-image" />
                              </div>
                            
                            <div className="reply-texts">
                                      <h5>Learnado Dicaprio</h5>
                                      <p>I say this every day</p>
                           </div>
                  </div>
                 <div className="author-actions">
                          <span>3 days ago</span>
                            <h6 onClick={() => setReplyStatus(!replyStatus)}>Reply</h6>
                </div>
                  <ReplyForm  status={replyStatus} func={setReplyStatus} />                                    
     </div>
  )
}

export default ReplyMoja