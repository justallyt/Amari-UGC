import { IoCloseOutline } from "react-icons/io5";
import { VscSend } from "react-icons/vsc";

const ReplyForm = ({ status, func}) => {
  return (
         <div className={status ? "reply-form active" : "reply-form"}>
                  <form>       
                          <div className="reply-form-content">
                                 <textarea name="" id="" className="reply-form-control" placeholder="Add a reply" cols="30" rows="10"></textarea>
                                <button><VscSend /></button>
                          </div>
                  </form>
                   <span onClick={() => func(false)}><IoCloseOutline /></span>
        </div>
  )
}

export default ReplyForm