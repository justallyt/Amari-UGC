/* eslint-disable react/prop-types */
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import UserChoice from "./pages/UserChoice"
import Register from "./pages/Register"
import Login from "./pages/Login"
import BrandDashboard from "./pages/BrandDashboard/BrandDashboard"
import ConsumerDashboard from "./pages/Consumer/ConsumerDashboard"
import Settings from "./pages/Consumer/Settings"

function App() {

  return (
    <>
           <Routes>
                   <Route path="/" element={<Home />} />
                   <Route path="/user/register" element={<UserChoice />} />
                   <Route path="/user/register/:type" element={<Register />} />
                   <Route path="/user/login" element={<Login />} />
                   { /* Dashboard Routes */}

                   <Route path="/brand/dashboard" element={<BrandDashboard />} />
                   <Route path="/consumer/dashboard" element={<ConsumerDashboard />} />
  
                   <Route path="/:id" element={<ConsumerDashboard />} />
                   <Route path="/:id/settings" element={<Settings />} />
                   <Route path="/:id/settings/:type" element={<Settings />} />
                   {/* Consumer Routes */}
      
           </Routes>
    </>
  )
}

export default App
