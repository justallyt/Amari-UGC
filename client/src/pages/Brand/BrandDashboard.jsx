import BrandDashboardBody from "../../components/Brand/BrandDashboardBody"
import "../../css/brand/dashboard_brand.css"
import { useDispatch, useSelector } from "react-redux"
import { useGetUserProfileQuery } from "../../redux/usersSlice"
import { setProfile } from "../../redux/profileSlice"
import { useEffect } from "react"
const BrandDashboard = () => {
  
  return (
    <>
          <BrandDashboardBody />
    </>
  )
}

export default BrandDashboard