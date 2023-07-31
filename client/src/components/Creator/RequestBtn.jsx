import { useEffect, useState } from "react"
import { useRequestCreationPermissionMutation } from "../../redux/usersSlice"
import { useSelector } from "react-redux"
import toast, { Toaster } from "react-hot-toast"
const RequestBtn = ({id, refetch}) => {
  const [requestStatus, setRequestStatus] = useState('Request')
  const [ result, setResult] = useState(false)
  const [ submitRequest ] = useRequestCreationPermissionMutation();
  const { requests } = useSelector(state => state.utils)

  useEffect(()=>{
         if(requests){
               const exists = Object.values(requests);
          
               for (let i = 0; i < exists.length; i++) {
                       if(exists[i].brand == id){
                              setRequestStatus("Requested")
                              setResult(true);
                       }
               }
         }
  }, [requests, id])
  const requestToWorkWithBrand = async (brandId) => {
          setRequestStatus('Requesting...')
          try {
            const res = await submitRequest({brandId})
              if(res) {
                     setRequestStatus('Requested')
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