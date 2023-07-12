/* eslint-disable react/prop-types */
import { Routes, Route } from "react-router-dom"
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
import AdminRoutes from "./utils/AdminRoutes"
import AdminDashboard from "./pages/Admin/AdminDashboard"

function App() {

  return (
    <>
           <Routes>
                   <Route path="/" element={<Home />} />
                   <Route path="/user/register" element={<UserChoice />} />
                   <Route path="/user/register/:type" element={<Register />} />
                   <Route path="/user/login" element={<Login />} />
                    
                   {/* Consumer Routes */}
                     <Route element={<CreatorRoutes />}>
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

                     { /* Admin Routes */}
                     <Route element={<AdminRoutes />}>
                                   <Route path="/admin/:id" element={<AdminDashboard />} />
                     </Route>
           </Routes>
    </>
  )
}

export default App
