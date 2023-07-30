import { useEffect, useState } from "react"
import { useRequestCreationPermissionMutation } from "../../redux/usersSlice"
import { useSelector } from "react-redux"

const RequestBtn = ({id}) => {
  const [requestStatus, setRequestStatus] = useState('Request')
  const [ result, setResult] = useState(false)
  const [ submitRequest ] = useRequestCreationPermissionMutation();
  const { requests } = useSelector(state => state.utils)

  useEffect(()=>{
         
  }, [])
  const requestToWorkWithBrand = async (brandId) => {
          setRequestStatus('Requesting...')
          try {
            const res = await submitRequest({brandId})
              if(res) {
                     setRequestStatus('Requested')
                     setResult(true)
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