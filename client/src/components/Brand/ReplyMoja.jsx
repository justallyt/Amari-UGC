import { calculateTimePassed } from "../../utils/dateConverter";

const ReplyMoja = ({ content }) => {
  return (
          <div className="reply-moja">
                  <div className="reply-profile">
                              <div className="comment-image-profile">
                                          <img className={content.role === 'Creator' ? 'creator-photo' : 'brand'} src={content.photo} alt="reply-image" />
                              </div>
                            
                            <div className="reply-texts">
                                      <h5>{content.name}</h5>
                                      <p>{content.reply}</p>
                           </div>
                  </div>
                 <div className="author-actions">
                          <span>{calculateTimePassed(content.createdAt)}</span>
                            {/* <h6 onClick={() => setReplyStatus(!replyStatus)}>Reply</h6> */}
                </div>
                  {/* <ReplyForm  status={replyStatus} func={setReplyStatus} />                                     */}
     </div>
  )
}

export default ReplyMoja