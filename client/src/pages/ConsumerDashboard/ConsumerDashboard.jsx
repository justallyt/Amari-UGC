import { useEffect } from "react"
import toast, { Toaster } from "react-hot-toast"

const ConsumerDashboard = () => {
  useEffect(() => {
         toast.success("Login Successful")
  }, [])
  return (
    <>
             <Toaster />
    </>
  )
}

export default ConsumerDashboard