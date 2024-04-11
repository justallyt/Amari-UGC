import { useEffect, useState } from "react"
import { useRequestCreationPermissionMutation, useSubscribeToBrandMutation } from "../../redux/usersSlice"
import { useSelector } from "react-redux"
import toast, { Toaster } from "react-hot-toast"
const RequestBtn = ({id, refetch}) => {
  const [requestStatus, setRequestStatus] = useState('Subscribe')
  const [ result, setResult] = useState(false)
  //const [ submitRequest ] = useRequestCreationPermissionMutation();
  const { requests } = useSelector(state => state.utils)
  const [ subscribe ] = useSubscribeToBrandMutation();
  useEffect(()=>{
         if(requests){
               const exists = Object.values(requests);
          
               for (let i = 0; i < exists.length; i++) {
                       if(exists[i].brand == id){
                              setRequestStatus("Subscribed")
                              setResult(true);
                       }
               }
         }
  }, [requests, id])
  const requestToWorkWithBrand = async (brandId) => {
          setRequestStatus('Subscribing...')
          try {
            //const res = await submitRequest({brandId})
            const res = await subscribe({brandId});
              if(res) {
                     setRequestStatus('Subscribed')
                     setResult(true);
                     refetch();
                     console.log(res);
                     toast.success(res.data.status, { id: 'request status'})
              }
         } catch (error) {
          console.log(error)
    }
  }
  return (
          <>
                    <Toaster />
                   <button className={result  ? 'requested' : ''}  onClick={() => requestToWorkWithBrand(id)}>{requestStatus}</button>
          </>
  )
}

export default RequestBtn