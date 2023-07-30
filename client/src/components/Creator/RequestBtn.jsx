import { useEffect, useState } from "react"
import { useRequestCreationPermissionMutation } from "../../redux/usersSlice"
import { useSelector } from "react-redux"

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
              }
         } catch (error) {
          console.log(error)
    }
  }
  return (
       <button className={result  ? 'requested' : ''}  onClick={() => requestToWorkWithBrand(id)}>{requestStatus}</button>
  )
}

export default RequestBtn