import toast, { Toaster } from "react-hot-toast";
import { useDeleteBrandRewardMutation } from "../../redux/brand/brandSlice"
import Spinner3 from "../Spinner3";

const RewardDeletePopup = ({ id, func }) => {
    const [DeleteReward, { isLoading}] = useDeleteBrandRewardMutation();

    const handleDelete = async () => {
           try {
                const res = await DeleteReward({id}).unwrap();

                if(res){
                       toast.success(res.message, { id: 'reward-delete-success'})
                       func();
                }
           } catch (error) {
                 // console.log(error)
                  toast.error("Error. Your reward could not be deleted at this time", { id: "reward-delete-err1"})
                  func();
           }
    }
  return (
    <div className="reward-delete-popup">
              <Toaster />
              <div className="reward-delete-box">
                         <h3>Are you Sure you want to Delete the this Reward</h3>
                         <p>This process is irreversible.</p>
                
                         <div className="box-btns">
                                  <button onClick={() => func(false)}>Cancel</button>
                                  <button onClick={handleDelete}>{ isLoading ? <Spinner3 /> : "Delete"} </button>         
                         </div>
              </div>
    </div>
  )
}

export default RewardDeletePopup