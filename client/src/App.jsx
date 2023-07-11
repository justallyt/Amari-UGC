/* eslint-disable react/prop-types */
import { Routes, Route, useParams, useLocation } from "react-router-dom"
import Home from "./pages/Home"
import UserChoice from "./pages/UserChoice"
import Register from "./pages/Register"
import Login from "./pages/Login"
import BrandDashboard from "./pages/Brand/BrandDashboard"
import CreatorDashboard from "./pages/Creator/CreatorDashboard"
import CreatorSettings from "./pages/Creator/CreatorSettings"
import BrandRoutes from './utils/BrandRoutes'
import CreatorRoutes from "./utils/CreatorRoutes"
import BrandSettings from "./pages/Brand/BrandSettings"
import VideoCreate from "./pages/Creator/VideoCreate"
import CreatorAssets from "./pages/Creator/CreatorAssets"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

function App() {
  const locator = useLocation()
  const [isUser, setIsUser] = useState(false)
  const { userInfo } = useSelector(state => state.auth)
  useEffect(()=> {
         if(userInfo !== null && userInfo.role === import.meta.env.VITE_CONSUMER_ROLE){
                  setIsUser(true)
                  console.log('Something')
         }else{ 
                 setIsUser(false)
                 console.log('Something Else')
         }
  }, [userInfo])
  
  //console.log([userInfo.username, userInfo.id].some((val) => val ))
  return (
    <>
           <Routes>
                   <Route path="/" element={<Home />} />
                   <Route path="/user/register" element={<UserChoice />} />
                   <Route path="/user/register/:type" element={<Register />} />
                   <Route path="/user/login" element={<Login />} />
                    
                   {/* Consumer Routes */}
                     <Route element={<CreatorRoutes logger={isUser} />}>
                               <Route path="/creator/:id/" element={<CreatorDashboard />} />
                               <Route path="/creator/:id/new" element={<VideoCreate />} />
                               <Route path="/creator/:id/assets" element={<CreatorAssets />} />
                               <Route path="/creator/:id/settings" element={<CreatorSettings />} />
                               <Route path="/creator/:id/settings/:type" element={<CreatorSettings />} />
                     </Route>


                     {/*Brand Routes */}
                     <Route element={<BrandRoutes />}>
                                <Route path="/brand/:id/" element={<BrandDashboard />} />
                                <Route path="/brand/:id/settings" element={<BrandSettings />} />
                     </Route>
           </Routes>
    </>
  )
}

export default App
