import ReplyForm from "./ReplyForm";
import { useState } from "react";
import ReplyMoja from "./ReplyMoja";
import { calculateTimePassed } from "../../utils/dateConverter";

const CommentMoja = ({ data }) => {
  const [replyStatus, setReplyStatus] = useState(false)
   console.log(data)
  return (
    <div className="comment-moja">
              <div className="main-comment">
                    <div className="comment-image-profile">
                                <img src={data && data.commenter.photo} alt="image" />
                    </div>
                     <div className="author-texts">
                              <h5>{data && data.commenter.name}</h5>
                              <p>{data && data.comment}</p>
                              <div className="author-actions">
                                        <span>{data && calculateTimePassed(data.createdAt)}</span>
                                          <h6 onClick={() => setReplyStatus(!replyStatus)}>Reply</h6>
                              </div>
                               <ReplyForm  status={replyStatus} func={setReplyStatus} comment={data._id} />
                               <div className="replies-body">
                                            { data && data.replies.length > 0 && 
                                                        data.replies.map(item => <ReplyMoja content={item} key={item.reply_id}/>)
                                              }
                               </div>
                   </div>
       </div>
</div>
  )
}

export default CommentMoja