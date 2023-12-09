import { useRef, useState } from "react";
import { useSelector } from "react-redux"
import { IoCloseOutline } from "react-icons/io5";
import { VscSend } from "react-icons/vsc";
import { useReplyOnCommentMutation } from "../../redux/assetSlice";
import toast from 'react-hot-toast'

const ReplyForm = ({ status, func, comment}) => {
  const { profile } = useSelector(state => state.profile)
  const [replyMsg, setReplyMsg] = useState('')
  const [replyStatus, setReplyStatus] = useState(false)
  const inputRef = useRef();

  const checkReplyStatus = (reply) => {
           if(reply === ''){
                  setReplyStatus(false)
           }else{
                 setReplyStatus(true)
                 setReplyMsg(reply)
           }
  }

  const [ ReplyComment ] = useReplyOnCommentMutation();

  const CreateReply = async (e) => {
          e.preventDefault();
          const reply_data = {
                  id: comment,
                  person: profile._id,
                  name: profile.name,
                  message: replyMsg,
                  photo: profile.profilePic.url,
                  role: profile.role
          }

          const result = await ReplyComment(reply_data).unwrap();

          if(result){
                inputRef.current.value = '';
                setReplyStatus(false);
                func(false)
          }else{
                toast.error('Could not reply on the comment', { id: 'reply-error'})
          }
  }
  return (
         <div className={status ? "reply-form active" : "reply-form"}>
                  <form>       
                          <div className="reply-form-content">
                                 <textarea onChange={(e) => checkReplyStatus(e.target.value)}  className="reply-form-control" placeholder="Add a reply" cols="30" rows="10" ref={inputRef} ></textarea>
                                <p className={replyStatus ? 'active': ''} onClick={(e) =>CreateReply(e)}><VscSend /></p>
                          </div>
                  </form>
                   <span onClick={() => func(false)}><IoCloseOutline /></span>
        </div>
  )
}

export default ReplyForm