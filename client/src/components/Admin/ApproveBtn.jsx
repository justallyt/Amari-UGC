import CogSpinner from "../CogSpinner"
import { PiCheck } from "react-icons/pi"
const ApproveBtn = ({ load, fnClick, id}) => {
  return (
        <button onClick={() => fnClick(id)} className="approve">{ load ? <CogSpinner />   : <span><PiCheck /></span> }  Approve</button>
  )
}

export default ApproveBtn