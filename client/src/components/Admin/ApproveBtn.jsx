import CogSpinner from "../CogSpinner"
import { PiCheck } from "react-icons/pi"
import { useApproveCreatorMutation } from "../../redux/admin/adminSlice"
import { useState } from "react"
import toast from "react-hot-toast"

const ApproveBtn = ({ id}) => {
     const [loading, setLoading] = useState(false);
      const [ approveCreator ] = useApproveCreatorMutation();

      const approve = async (id) => {
             setLoading(true);
             try{
                   const res = await approveCreator({ id }).unwrap();

                   if(res){
                        toast.success(res.message, { id: 'Approval Successful'});
                        setLoading(false);
                   }
             }catch(error){
                    console.log(error);
                    toast.error("Error approving request.")
             }
      }
  return (
        <button onClick={() => approve(id)} className="approve">{ loading ? <CogSpinner />   : <span><PiCheck /></span> }  Approve</button>
  )
}

export default ApproveBtn