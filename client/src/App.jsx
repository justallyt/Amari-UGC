/* eslint-disable react/prop-types */
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import UserChoice from "./pages/UserChoice"
import Register from "./pages/Register"
import Login from "./pages/Login"
import BrandDashboard from "./pages/Brand/BrandDashboard"
import ConsumerDashboard from "./pages/Consumer/ConsumerDashboard"
import Settings from "./pages/Consumer/Settings"
import ConsumerRoutes from "./utils/ConsumerRoutes"
import BrandRoutes from './utils/BrandRoutes'
function App() {

  return (
    <>
           <Routes>
                   <Route path="/" element={<Home />} />
                   <Route path="/user/register" element={<UserChoice />} />
                   <Route path="/user/register/:type" element={<Register />} />
                   <Route path="/user/login" element={<Login />} />
                    
                   {/* Consumer Routes */}
                     <Route element={<ConsumerRoutes />}>
                               <Route path="/creator/:id/" element={<ConsumerDashboard />} />
                               <Route path="/creator/:id/settings" element={<Settings />} />
                               <Route path="/creator/:id/settings/:type" element={<Settings />} />
                     </Route>


                     {/*Brand Routes */}
                     <Route element={<BrandRoutes />}>
                                <Route path="/brand/:id" element={<BrandDashboard />} />
                     </Route>
           </Routes>
    </>
  )
}

export default App
